"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();

  // get id from params
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' })

  // react hook for EditPrompt component
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    // function call
    if (promptId) getPromptDetails();
  }, [promptId]) // run whenever promptId changes which can get from request query

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    // to copy all the key simply press alt
    <Form 
      type="Edit" 
      post={post} 
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt