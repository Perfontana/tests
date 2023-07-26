import React, { memo } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import takeImage from "../../utils/imagePath";

export interface PayloadPosts {
  id: number;
  title: string;
  text: string;
  image?: string;
  tags?: string;
  user: {
    username: string;
    id: number;
  };
}

interface IPostProps {
  post: PayloadPosts;
  postsModal?: (id: number) => void;
  isUserPage?: boolean;
}

const Post = (props: IPostProps): JSX.Element => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const {
    post: {
      image,
      title,
      text,
      user: { username },
      id,
      tags,
    },
    isUserPage,
    postsModal,
  } = props;
  const postImage = takeImage(image);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {image && (
        <CardMedia
          data-testid="post-image"
          component="img"
          max-height="400"
          image={postImage}
          alt="post"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="p">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" color="text.secondary">
          {text}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {tags}
        </Typography>
        <Typography variant="h3" color="text.primary">
          {username}
        </Typography>
        {isAuth && isUserPage && postsModal && (
          <IconButton
            data-testid="post-edit-btn"
            aria-label="delete"
            size="large"
            onClick={() => {
              postsModal(id);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(Post);
