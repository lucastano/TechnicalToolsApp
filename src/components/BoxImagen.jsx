import React from 'react'
import { Box, Button, Divider, Paper} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const BoxImagen = ({img}) => {
  return (
    <>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 1,
            width: 20,
            height: 20,
            },
        }}
        >
        
        <Paper elevation={3}>
                <img
                srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={img}
                alt="img"
                loading="lazy"
                 />
            <Divider/>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
              >
            Subir imagen
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </Paper>
        </Box>

           
    </>
  )
}
