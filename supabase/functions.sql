
-- Create a function to get the latest message from each conversation
CREATE OR REPLACE FUNCTION public.get_latest_messages(current_user_id UUID)
RETURNS TABLE (
  id UUID,
  sender_id UUID,
  receiver_id UUID,
  content TEXT,
  created_at TIMESTAMPTZ,
  read BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  WITH ranked_messages AS (
    SELECT 
      m.*,
      ROW_NUMBER() OVER (
        PARTITION BY 
          CASE 
            WHEN m.sender_id = current_user_id THEN m.receiver_id 
            ELSE m.sender_id 
          END
        ORDER BY m.created_at DESC
      ) as rn
    FROM 
      public.messages m
    WHERE 
      m.sender_id = current_user_id OR m.receiver_id = current_user_id
  )
  SELECT 
    id, sender_id, receiver_id, content, created_at, read
  FROM 
    ranked_messages
  WHERE 
    rn = 1
  ORDER BY 
    created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
