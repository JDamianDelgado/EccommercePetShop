import axiosInstance from "../../config/axios";
import { useEffect, useState } from "react";
import "src/Styles/Admin/Usuarios-Adm.css"
import Swal from "sweetalert2";

export const Usuarios = () => {
  const [userItems, setUserItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const loadUser = async () => {
    try {
      const response = await axiosInstance.get("user");
      setUserItems(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Usuarios cargados correctamente',
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.error("Error al cargar los usuarios", error);
      Swal.fire({
        icon: 'error',
        text: 'Error al cargar los usuarios',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const enableEditMode = (user) => {
    setEditMode(true);
    setEditableUser({...user}); 
    setOriginalUser({...user}); 
  };

  const saveUser = async () => {
    try {
      const userId = editableUser.IdUser;

      const changedFields = {};
      for (const key in editableUser) {
        if (editableUser[key] !== originalUser[key]) {
          changedFields[key] = editableUser[key];
        }
      }

      if (Object.keys(changedFields).length > 0) {
        await axiosInstance.put(`user/${userId}`, changedFields);
        setUserItems(userItems.map(user => user.IdUser === userId ? {...editableUser} : user));
        Swal.fire({ icon: 'success',
        title: 'Usuario',
        text: 'actualizado correctamente',
        showConfirmButton: false,
       timer: 2000, })} else {
        Swal.fire({
         icon:'info',
          title: 'No se detectaron cambios',
         text: '',
         showConfirmButton: false,
          timer: 2000,
})      }

      setEditMode(false);
      setEditableUser(null);
      setOriginalUser(null);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      Swal.fire({
        icon:'error',
        text: 'Error al actualizar el usuario',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditableUser(null);
    setOriginalUser(null);
  };

  const handleFieldChange = (field, value) => {
    setEditableUser({
      ...editableUser,
      [field]: value
    });
  };

  const confirmDelete = (userId) => {
    setShowDeleteConfirm(userId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const deleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/user/${userId}`);
      setUserItems(userItems.filter(user => user.IdUser !== userId));
      setShowDeleteConfirm(null);
      Swal.fire({
        icon:'success',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 2000,
      })    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      Swal.fire({
        icon:'error',
        text: 'Error al eliminar el usuario',
        showConfirmButton: false,
        timer: 2000,
      })    }
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1 className="title">Usuarios</h1>
      </div>

      <div className="users-list">
        {userItems.map((user) => {
          const isEditing = editMode && editableUser && user.IdUser === editableUser.IdUser;
          const isConfirmingDelete = showDeleteConfirm === user.IdUser;

          return (
            <div key={user.IdUser} className={`user-card ${isEditing ? 'editing' : ''}`}>
              {isConfirmingDelete ? (
                <div className="delete-confirm">
                  <p className="delete-message">¿Estás seguro de que deseas eliminar a este usuario?</p>
                  <div className="delete-actions">
                    <button onClick={() => deleteUser(user.IdUser)} className="confirm-delete-btn">Confirmar</button>
                    <button onClick={cancelDelete} className="cancel-delete-btn">Cancelar</button>
                  </div>
                </div>
              ) : isEditing ? (
                <>
                  <div className="edit-header">
                    <h3>Editando Usuario</h3>
                    <div className="edit-buttons">
                      <button onClick={saveUser} className="save-btn">Guardar</button>
                      <button onClick={cancelEdit} className="cancel-btn">Cancelar</button>
                    </div>
                  </div>

                  <div className="edit-fields">
                    <div className="field-group">
                      <label>Nombre:</label>
                      <input type="text" value={editableUser.name || ''} onChange={(e) => handleFieldChange('name', e.target.value)} />
                    </div>

                    <div className="field-group">
                      <label>Email:</label>
                      <input type="email" value={editableUser.email || ''} onChange={(e) => handleFieldChange('email', e.target.value)} />
                    </div>

                    <div className="field-group">
                      <label>Teléfono:</label>
                      <input type="tel" value={editableUser.phone || ''} onChange={(e) => handleFieldChange('phone', e.target.value)} />
                    </div>

                    <div className="field-group">
                      <label>Perfil:</label>
                      <select value={editableUser.Range ? true : false} onChange={(e) => handleFieldChange('Range', e.target.value === 'true')}>
                        <option value={true}>Admin</option>
                        <option value={false}>Usuario</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label>Dirección:</label>
                      <input type="text" value={editableUser.address || ''} onChange={(e) => handleFieldChange('address', e.target.value)} />
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <label>Ciudad:</label>
                        <input type="text" value={editableUser.city || ''} onChange={(e) => handleFieldChange('city', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label>País:</label>
                        <input type="text" value={editableUser.country || ''} onChange={(e) => handleFieldChange('country', e.target.value)} />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Fecha de Nacimiento:</label>
                      <input type="date" value={editableUser.birthday || ''} onChange={(e) => handleFieldChange('birthday', e.target.value)} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="user-header">
                    <h3>{user.name}</h3>
                    <div className="action-buttons">
                      <button onClick={() => enableEditMode(user)} className="edit-btn">Editar</button>
                      <button onClick={() => confirmDelete(user.IdUser)} className="delete-btn">Eliminar</button>
                    </div>
                  </div>

                  <div className="user-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                    <p><strong>Perfil:</strong> {user.Range ? "Admin" : "Usuario"}</p>
                    <p><strong>Dirección:</strong> {user.address}</p>
                    <p><strong>Ciudad/País:</strong> {user.city} - {user.country}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {user.birthday}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};