import CommentItem from "./CommentItem"

interface CommentFeedProps{
    comments?: Record<string,any>[]
}

export default function CommentFeed({comments}:CommentFeedProps) {

    if(!comments){
        return null
    }
  return (
    <>
    {
        comments.map((comment: Record<string, any>) => (
            <CommentItem key={comment.id} data={comment}/>
    ))
    }
    </>
  )
}
