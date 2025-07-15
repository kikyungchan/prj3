import { CommentAdd } from "./CommentAdd.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";

export function CommentContainer({ boardId }) {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  function handleReload() {
    setReloadTrigger((prev) => prev + 1);
  }

  return (
    <div>
      <h3>댓글 창</h3>
      <CommentAdd boardId={boardId} onSave={handleReload} />
      <CommentList boardId={boardId} reloadTrigger={reloadTrigger} />
    </div>
  );
}
