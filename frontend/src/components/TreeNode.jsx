import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createTree } from '../redux/Slice/TreeSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TreeNode = ({ node }) => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClick = async(id) => {
        console.log(id)
        let response = await dispatch(createTree({name, parentId:id}))
        console.log(response, 'register error resposne');
        setOpen(false)
        if (response.error) {


            if (response.payload?.message) {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: `${response.payload.message}`,
                    })
                }
                return
            } else {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Invalid Form Submission`,
                    })
                }
                return
            }
        } else {

            {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfull',
                    text: `${response.payload.message}`,
                }).then(function () {
                    navigate('/')
                })
            }

        }
    };

    function handleChange(e) {
        let { value } = e.target
        setName((prev) => prev = value)
    }

    return (
        <div className='treeNode' style={{ marginLeft: '20px' }}>
            <button onClick={() => handleOpen()}>
                {node.name}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create A child
                    </Typography>
                    <TextField onChange={handleChange} className='formInput' name='name' fullWidth label="Child Name" id="fullWidth" variant="outlined" xs={{ width: "100%" }} />
                    <button onClick={(e)=>{handleClick(node._id)}}> Submit</button>
                </Box>
            </Modal>
            {node.childreen && node.childreen.length > 0 && (
                <div className="childNode">
                    {node.childreen.map((child) => (
                        <TreeNode key={child._id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TreeNode