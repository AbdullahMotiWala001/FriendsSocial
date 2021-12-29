import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@material-ui/core/Grid';

const Post = (props) => {
    if (props.postImage) {
        console.log(`It is link => ${props.postImage}`)
    } else {
        console.log()
    }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh', backgroundColor: '#fff', width: '50vw'}
            }
        >
            <Grid item  >
                <Card sx={{ width: '470px', height: '500px',boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{}} sx={{ width: 48, height: 48, bgcolor: red[500] }} aria-label="recipe" src={props.dp}>
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={props.author}
                        subheader={props.postingDate}
                    />
                    {props.postImage && (<CardMedia
                        component="img"
                        height='70%'
                        image={props.postImage}
                    />)
                    }
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.postDesc}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >)
}

export default Post;
