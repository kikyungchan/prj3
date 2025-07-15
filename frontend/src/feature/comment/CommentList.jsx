import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function ComentItem({ comment }) {
  return (
    <div className="border m-3">
      <div className="d-flex justify-content-between m-3">
        <div>{comment.authorNickName}</div>
        <div>{comment.timesAgo}</div>
      </div>
      <div>{comment.comment}</div>
    </div>
  );
}

export function CommentList({ boardId, reloadTrigger }) {
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/comment/board/${boardId}`)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [boardId, reloadTrigger]);

  if (commentList === null) {
    return <Spinner />;
  }

  return (
    <div>
      {commentList.map((comment) => (
        <ComentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
