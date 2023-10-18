
export default function DeleteConfirm({toggleDeleteAccountConfirm}){
    return (
      <div className='delete-confirm-module'>
        <div className='delete-confirmation'>
          <div id="delete-modal-close" onClick={() => toggleDeleteAccountConfirm(false)}>
            X
          </div>
          <div>
            <h1>
              Are you sure?
            </h1>
          </div>
          <div className='delete-account-button'>
            Delete Account
          </div>
        </div>
      </div>
    )
  }