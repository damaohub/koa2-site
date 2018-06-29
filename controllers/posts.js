const postService = require('../services/posts')

    const _tagsPromise = postService.getTags()//上下文之外执行一次IO
    const _addLink = (model,url) => {
        for(let i = 0;i<model.length; i++) {
            model[i].link = url
        }
        return model
    }
    
    const index = async (ctx, next) => {
        let _posts = await postService.getPosts()
        let _tags = await _tagsPromise;
        _addLink(_tags, ctx.request.origin + '/tag/')
        _addLink(_posts, ctx.request.origin + '/post/')
        ctx.render('index.html', {
            posts: _posts,
            tags: _tags
        })
    }

    const PostById = async (ctx, next) => {
        const _postPromise = postService.getPost({ postID: ctx.params.id })
        const _postTagsPromise = postService.getTagsBypost(ctx.params.id)
        let _tags = await _tagsPromise;
        _addLink(_tags, ctx.request.origin + '/tag/')
        let _post = await _postPromise
        let _postTags = await _postTagsPromise
        ctx.render('post.html', {
            tags: _tags,
            post: _post,
            postTags: _postTags
        })
    }

    const PostsByTag = async (ctx, next) => {
        let data = await postService.getPostsByTag(ctx.params.tag)
        let _tags = await _tagsPromise;
        _addLink(_tags, ctx.request.origin + '/tag/')
        ctx.render('tag.html', {
            tags: _tags,
            posts: data,
            tag: ctx.params.tag,
         
        })
    }

module.exports = {
    index,
    PostById,
    PostsByTag
}    