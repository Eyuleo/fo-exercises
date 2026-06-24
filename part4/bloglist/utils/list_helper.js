const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  const total = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((best, blog) =>
    blog.likes > best.likes ? blog : best,
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

export default { dummy, totalLikes, favoriteBlog }
