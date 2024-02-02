import Post from "@/models/postModel";
import { ConnectDB } from "@/utils/MongoDb";
import { auth } from "@clerk/nextjs";

export const POST = async (request) => {
    const { userId, postId, like } = await request.json();
    
    try {
        await ConnectDB();
        
        const post = await Post.findOne( { _id: postId } ); // Use findOne instead of find
        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }
        if (like) {
            if (post.likes.includes(userId)) {
                return new Response(JSON.stringify({ post }), { status: 200 });
            }
            await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
            return new Response(JSON.stringify({post}), { status: 200 });
        }
        if (!like && post.likes.includes(userId)) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            return new Response(JSON.stringify({ post }), { status: 200 });
        }
        return new Response(JSON.stringify({ message: "No action performed" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Failed" }), { status: 500 });
    }
}

