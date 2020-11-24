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
  key,
  recipe_id,
  image,
  name,
  description,
  ingredients,
  author_name,
  itemSelected,
}) {
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(itemSelected);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // QUESTION: I could also potentially do the "ADD"
  // or "TOGGLE" distinction here...
  const handleSelectClick = () => {
    setSelected(!selected);
  };
  const formattedImage = image.split("'")[1].split("'")[0];

  const cleanedIngredients = ingredients.replace(/'/g, '"');
  const formattedIngredients = JSON.parse(cleanedIngredients);

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
                  recipe_key: key,
                  recipe_id,
                  internal_id: author_name + recipe_id,
                  author_name,
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
            <Typography paragraph>Ingredients:</Typography>
            {formattedIngredients &&
              formattedIngredients.map((ingredient) => (
                <Typography paragraph>{ingredient}</Typography>
              ))}

            <Typography paragraph>Instructions here</Typography>
            <Typography paragraph>Additional Instructions</Typography>
            <Typography>Final notes here</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
