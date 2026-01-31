import React from 'react';
import CustomDialog from './CustomDialog';

const DetailsModal = ({ isOpen, onClose, title, children }) => {
    return (
        <CustomDialog
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            showCancel={false}
            confirmText="Close"
            onConfirm={onClose}
            variant="default"
        >
            {children}
        </CustomDialog>
    );
};

export default DetailsModal;
