import {
    Avatar,
    Paper,
    Alert,
    AlertTitle,
    List,
    ListItem,
    ListItemText,
    Container,
    Typography,
    Box,
    TextField
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import { LoadingButton } from "@mui/lab";
  import agent from "../../app/api/agent";
  import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
  
  export default function Register() {
    const navigate=useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);  
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
      mode: 'onTouched'
    });
  
    const onSubmit = async (data: any) => {
      try {
        await agent.Account.register(data);
        toast.success("Successfuly registered-now login")
        navigate('/login');
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          // const errorMessages = Object.values(serverErrors).flat();
          setValidationErrors(Object.values(serverErrors).flat() as never[]);
        } else if (error.data && error.data.errors) {
          const serverErrors = error.data.errors;
          // const errorMessages = Object.values(serverErrors).flat();
          setValidationErrors(Object.values(serverErrors).flat() as never[]);
        }
      }
    }

    // function handleApiErrors(errors:any){
    //     console.log(errors)
    //     if(errors){
    //         errors.array.forEach((error:string,index:number) => {
    //             if(error.includes('Password')){
    //                 setError('password',{message:error})
    //             }else if(error.includes('Email')){
    //                 setError('email',{message:error})
    //             }else if(error.includes('Username')){
    //                 setError('username',{message:error})
    //             }
    //         });
    //     }
    // }
  
    return (
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}
        /* <Box component="form" onSubmit={handleSubmit(data=>agent.Account.register(data)
        .then(()=>{
            toast.success('Registration successful - you can now login')
            navigate('/login');
        })
        .catch(error=>handleApiErrors(error)))}  */
         noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors?.username?.message?.toString()}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email', { required: 'Email is required',
                pattern:{
                    value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                    message: 'Not a valid email adress'
                }
             })}
            error={!!errors.email}
            helperText={errors?.email?.message?.toString()}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Password is required',
                pattern:{
                    value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'pass does not meet complexity requirements'
                } 
             })}
            error={!!errors.password}
            helperText={errors?.password?.message?.toString()}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
            disabled={!isValid}
          >
            Register
          </LoadingButton>
          {validationErrors.length > 0 && (
            <Alert severity="error">
              <AlertTitle>Validation Errors</AlertTitle>
              <List>
                {validationErrors.map((error, index) => (
                  <ListItem key={index}>
                    <ListItemText>{error}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}
        </Box>
      </Container>
    );
  }