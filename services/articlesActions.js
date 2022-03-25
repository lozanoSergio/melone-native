import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

export async function getArticleComments(articleId, callback) {
  const articleCommentRef = firebase
    .database()
    .ref(`articles/${articleId}/comments`)
    .limitToLast(50);

  try {
    await articleCommentRef.on('value', async function(snapshot) {
      let commentsArr = [];

      snapshot.forEach(commentSnap => {
        let comment = {
          ...commentSnap.val(),
          id: commentSnap.key,
        };

        commentsArr.push(comment);
      });

      let comments = [];
      await Promise.all(
        commentsArr.map(async comment => {
          let liked = await getUserCommentsLikes(articleId, comment.id);
          comment.liked = liked;
          comments.push(comment);
        }),
      );

      callback(comments);
    });
  } catch (error) {
    console.log(error);
  }
}

export async function unsubscribeFromComments(articleId) {
  const articleCommentRef = firebase
    .database()
    .ref(`articles/${articleId}/comments`)
    .limitToLast(50);

  await articleCommentRef.off('value');
}

export async function addNewComment(comment, articleId) {
  const articleCommentRef = firebase
    .database()
    .ref(`articles/${articleId}/comments`);

  try {
    await articleCommentRef.push(comment);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteComment(commentId, articleId) {
  const articleCommentRef = firebase
    .database()
    .ref(`articles/${articleId}/comments`);
  articleCommentRef.child(commentId).remove();
}

export async function likeComment(comment, articleId, uid) {
  const commentRef = firebase.database().ref(`articles/${articleId}/comments`);
  const commentLikesRef = firebase
    .database()
    .ref(`articles/${articleId}/commentsLikes`);
  const liked = comment.liked;

  try {
    await commentRef.child(comment.id).transaction(result => {
      if (result) {
        if (result.likesCount && liked) {
          result.likesCount--;
        } else {
          result.likesCount++;
        }
      }
      return comment;
    });

    if (liked) {
      await commentLikesRef
        .child(comment.id)
        .child(uid)
        .remove();
    } else {
      await commentLikesRef.child(comment.id).set({[uid]: true});
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserCommentsLikes(articleId, commentId) {
  const commentsLikesRef = firebase
    .database()
    .ref(`articles/${articleId}/commentsLikes`);

  const uid = firebase.auth().currentUser.uid;

  let query = commentsLikesRef.child(commentId).child(uid);

  let querySnap = await query.once('value');

  let liked = false;

  if (querySnap.val() !== null) {
    liked = true;
  }

  return liked;
}
