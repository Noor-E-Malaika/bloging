import React, { useState } from 'react';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const CreateBlog = () => {
   const id = localStorage.getItem('userId')
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: ''
  });

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success('Blog Created');
        navigate('/my-blogs');
      }
    } catch (error) {
      console.log(error);
    }
  };
 
return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={'40%'}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={'10px 10px 20px #ccc'}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="black"
          >
            Create a post
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px',  }}>Title</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Description</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Image URL</InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;