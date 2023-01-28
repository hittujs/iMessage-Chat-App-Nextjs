import {
  ConversationPopulated,
  MessagePopulated,
} from "../../../backend/src/util/types";

// CreateUsername
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

//  SearchUsers
export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchResult>;
}

export interface SearchResult {
  id: string;
  username: string;
}

// create conversation

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface CreateConversationData {
  createConversation: { conversationId: string };
}

// conversations

export interface Conversation {
  conversations: Array<ConversationPopulated>;
}

export interface conversationsData {
  conversations: Array<Conversation>;
}

// messages

export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}
