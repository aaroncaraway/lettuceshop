import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { DispatchContext } from '../context/RecipeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: grey[500],
  },
  avatarSelected: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({
  recipe_id,
  image,
  name,
  description,
  ingredients,
  author_name,
  itemSelected,
}) {
  const dispatch = useContext(DispatchContext);
  console.log(image, name, author_name);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(itemSelected);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSelectClick = () => {
    setSelected(!selected);
  };
  const formattedImage = image.split("'")[1].split("'")[0];

  const cleanedIngredients = ingredients.replace(/'/g, '"');
  const formattedIngredients = JSON.parse(cleanedIngredients);
  console.log(formattedIngredients);

  const isSelected = selected;
  let button;
  if (isSelected) {
    button = (
      <IconButton aria-label="settings">
        <CheckCircleIcon />
      </IconButton>
    );
  } else {
    button = (
      <IconButton aria-label="settings">
        <CheckCircleOutlineIcon />
      </IconButton>
    );
  }
  return (
    <Box m={2}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              onClick={() => {
                dispatch({
                  type: 'ADD',
                  recipe_id,
                  name,
                  recipe_object: {
                    formattedImage,
                    author_name,
                    description,
                    formattedIngredients,
                  },
                });
              }}
            >
              {button}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={author_name}
        />
        <CardMedia
          className={classes.media}
          image={formattedImage}
          title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            {formattedIngredients &&
              formattedIngredients.map((ingredient) => (
                <Typography paragraph>{ingredient}</Typography>
              ))}

            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
