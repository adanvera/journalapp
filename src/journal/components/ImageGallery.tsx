import { useTheme } from "@emotion/react";
import { AddAPhotoOutlined } from "@mui/icons-material";
import { Grid, ImageList, ImageListItem } from "@mui/material";
import { createRef } from "react";
import { startUploadingFiles } from "../../store/journal";
import { useDispatch } from "react-redux";


export const ImageGallery = ({ images }) => {

  const theme = useTheme();
  const primaryColor = theme.palette.info.main || '';
  const dispatch = useDispatch();
  const inputFileRef = createRef<HTMLInputElement>();

  const onFileChange = (e: any) => {
    if (e.target.files.length === 0) {
      return;
    }
    const files = Array.from(e.target.files);
    dispatch(startUploadingFiles(files));
  }

  return (

    <>
      {
        (!images || images.length <= 0) &&
        <Grid
          container
          justifyContent='center'
          alignSelf='center'
          textAlign='center'
          width='100%'
          direction='row'
          sx={{
            backgroundColor: primaryColor,
            minHeight: '250px',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 5,
            cursor: 'pointer',
            transition: 'border 3s ease-in-out',
            '&:hover': {
              border: `1px solid ${theme.palette.primary.main}`,
              animation: 'ease-in-out',
              transition: 'border 3s ease-in-out',
              color: theme.palette.primary.main
            },
          }}
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          <input
            type='file'
            id='file'
            multiple
            onChange={onFileChange}
            style={{ display: 'none' }}
            ref={inputFileRef}
            accept="image/*" // Allow only images
          />
          <AddAPhotoOutlined />
        </Grid>
      }
      {
        (images && images.length >= 1) &&
        <ImageList
          sx={{
            width: '100%',
            backgroundColor: primaryColor,
            borderRadius: 5,
            minHeight: '250px'
          }}
          cols={4}
          rowHeight={200}
        >


          {images.map((image) => (
            <ImageListItem key={image}

            >
              <img
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                alt='image-note'
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      }
    </>
  )
}