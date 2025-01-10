import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const ModalHome = (props) => {
    const { imagen } = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        openModal();
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };

    function closeModal() {
        setIsOpen(false);
    }
    console.log('imagen', imagen.url);

    return (
        <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    backgroundColor: 'transparent',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden', // Asegura que no haya scroll
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    height: '90%',
                    width: '90%',
                }
            }}
        >
            {imagen && (
                <div className='flex-1 w-full h-full flex justify-center'>
                    <img
                        src={imagen.url}
                        alt="imagen"
                        className='object-contain'
                    />
                </div>
            )}
        </Modal >
    );
};

export default ModalHome;
