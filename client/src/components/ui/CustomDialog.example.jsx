/**
 * CustomDialog Usage Examples
 * 
 * This file demonstrates various ways to use the CustomDialog component
 */

import React, { useState } from 'react';
import CustomDialog from './CustomDialog';

// Example 1: Basic Confirmation Dialog
export const BasicConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    // Perform your action here
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Open Dialog
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        confirmText="Yes, Proceed"
        cancelText="Cancel"
      />
    </>
  );
};

// Example 2: Danger/Delete Dialog
export const DeleteConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted!');
    // Perform delete action
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete Item
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="This action cannot be undone. Are you sure you want to delete this item?"
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

// Example 3: Success Dialog
export const SuccessDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Show Success
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Success!"
        description="Your action was completed successfully."
        variant="success"
        confirmText="OK"
        showCancel={false}
      />
    </>
  );
};

// Example 4: Custom Content Dialog
export const CustomContentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Open Custom Dialog
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Content"
        confirmText="Save"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter email"
            />
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

// Example 5: Dialog with No Overlay Click
export const NoOverlayClickDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Open Dialog (No Overlay Click)
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Important Notice"
        description="You must use the buttons to close this dialog."
        closeOnOverlayClick={false}
        confirmText="I Understand"
      />
    </>
  );
};

// Example 6: Complete Usage in a Component
export const CompleteExample = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Perform delete operation
    console.log('Deleting:', itemToDelete);
    
    // Close delete dialog and show success
    setDeleteDialogOpen(false);
    setSuccessDialogOpen(true);
    
    // Auto-close success dialog after 2 seconds
    setTimeout(() => {
      setSuccessDialogOpen(false);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Dialog Examples</h2>
      
      <div className="space-x-4">
        <button
          onClick={() => handleDeleteClick({ id: 1, name: 'Sample Item' })}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete Item
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <CustomDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        description={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Dialog */}
      <CustomDialog
        isOpen={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        title="Success"
        description="Item deleted successfully!"
        variant="success"
        confirmText="OK"
        showCancel={false}
      />
    </div>
  );
};

export default CompleteExample;
