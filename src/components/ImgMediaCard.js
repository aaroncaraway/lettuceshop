import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
  },
});

export default function ImgMediaCard({
  image,
  name,
  description,
  ingredients,
  instructionsUrl,
}) {
  const classes = useStyles();
  const formattedImage = image.split("'")[1].split("'")[0];

  return (
    <Box m={2}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="240"
            image={formattedImage}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Ingredients
          </Button>
          <Button size="small" color="primary">
            <a href={instructionsUrl}>Instructions</a>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
