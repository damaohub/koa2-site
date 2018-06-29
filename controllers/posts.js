const postService = require('../services/posts')


    const index = async (ctx, next) => {
        let data = await postService.getPosts()
        let _link = await postService.getLink(ctx,'post/')
        ctx.render('index.html', {
            posts: data,
            link: _link
        })
    }

    const PostById = async (ctx, next) => {
        let data = await postService.getPost({ postID: ctx.params.id })
        let _tags = await postService.getTagsBypost(ctx.params.id)
        ctx.render('post.html', {
            post: data,
            tags: _tags
        })
    }

    const PostsByTag = async (ctx, next) => {
        let data = await postService.getPostsByTag(ctx.params.tag)
        let _link = await postService.getLink(ctx, 'post/')
        ctx.render('tag.html', {
            posts: data,
            tag: ctx.params.tag,
            link: _link
        })
    }

module.exports = {
    index,
    PostById,
    PostsByTag
}    