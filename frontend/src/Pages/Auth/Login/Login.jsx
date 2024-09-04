import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Material Ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//CSS
import '../Auth.css'

//Validation
import { checkWhiteSpace, emailValidation } from '../../../validation/validation';

//Reducer
import { login } from '../../../redux/Slice/AuthSlice'
import Swal from 'sweetalert2';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        let { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let successValidation = Object.entries(formData).map(([key, value]) => {
            if (typeof value === 'string') {
                formData[key] = value.trim();
            }

            let spaceExist = checkWhiteSpace(formData[key], key, setError)
            return spaceExist

        }).find(error => error === false);

        if (successValidation === false) return

        let validEmail = await emailValidation(formData.email, 'email', setError);

        if (!validEmail) {
            return;
        }

        let response = await dispatch(login(formData))
        console.log(response);
        
        if (response.error) {
            console.log('inside if');

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
                    window.location.href = '/'
                })
            }

        }

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <section>

            <Box height={'100%'}>
                <Grid container spacing={2} height={"100%"}>
                    <Grid item xs={12} className='all-center'>
                        <div className="inner-content">
                            <div className="form-header">
                                <h2 className='center-text'>Login</h2>
                            </div>
                            <form onSubmit={handleSubmit} className='form'>
                                <div className="form-input">
                                    <TextField onChange={handleChange} className='formInput' name='email' fullWidth label="Email" id="fullWidth" variant="outlined" xs={{ width: "100%" }} error={error.email !== "" ? true : false} helperText={error.email} />
                                </div>

                                <div className="form-input">
                                    <FormControl variant="outlined" fullWidth className='formInput' onChange={handleChange} error={error.password !== "" ? true : false}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        {error.password !== "" ? <FormHelperText>{error.password}</FormHelperText> : null}
                                    </FormControl>
                                </div>
                                <div className="form-btn-div">
                                    <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Login</Button>
                                </div>
                                <div className="from-footer">
                                    <p>Don't have an account?</p>
                                    <Link to='/register'>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>

            </Box>

        </section>

    )
}

export default Login