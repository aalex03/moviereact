import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import Upload from '../components/Upload';
import AnotherForm from '../components/AnotherForm';

const Admin = () => {
    const [selectedForm, setSelectedForm] = useState('showUpload'); // Initial selection

    const renderSelectedForm = () => {
        switch (selectedForm) {
            case 'showUpload':
                return <Upload />;
            case 'anotherForm':
                return <AnotherForm />;
            // Add more cases for additional forms
            default:
                return null;
        }
    };

    return (
        <div>
            <div className='d-flex w-100 justify-content-between mb-3' style={{marginTop: '4rem'}}>
                <ButtonGroup>
                    <Button className='p-2' onClick={() => setSelectedForm('showUpload')} active={selectedForm === 'showUpload'}>
                        Show Upload Form
                    </Button>
                    <Button className='p-2' onClick={() => setSelectedForm('anotherForm')} active={selectedForm === 'anotherForm'}>
                        Another Form
                    </Button>
                    {/* Add more buttons for additional forms */}
                </ButtonGroup>
            </div>

            {/* Render the selected form */}
            {renderSelectedForm()}
        </div>
    );
};

export default Admin;
