"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Comment } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="font-medium">{comment.authorId}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
