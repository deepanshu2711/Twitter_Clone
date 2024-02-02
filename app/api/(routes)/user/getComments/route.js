import Comment from "@/models/PostCommentModel";


export const POST = async(request)=>{
    try {
        const {postId} = await request.json();
        const res1 = await Comment.find({postId : postId});
        return new Response(JSON.stringify({res1},{status:200}));
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:"failed"}),{status:500});
    }
}