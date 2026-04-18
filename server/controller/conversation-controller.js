

import Conversation from "../model/Conversation.js";

export const newConversation = async (request, response) => {
    try {
        const {senderId, receiverId} = request.body;

        const exist = await Conversation.findOne({
            members: {
                $all: [senderId, receiverId]
            }
        })
        if(exist){
            return response.status(200).json({msg: 'Conversation already exists'});
        }
        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })

      await newConversation.save();
        return response.status(200).json({msg: 'Conversation created successfully'});
    } catch (error) {
        response.status(500).json(error.message);
    }
}
export const getConversation = async(request, response) =>{
    try{
        const {senderId, receiverId} = request.body;
       let conversation = await Conversation.findOne({members: {$all: [receiverId, senderId]}})
        return response.status(200).json(conversation)
    }
    catch(error){
        response.status(500).json(error.message);
    }
}