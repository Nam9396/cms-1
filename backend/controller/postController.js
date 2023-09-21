import Post from "../model/postModel.js";
import customError from "../utils/customError.js";

const createPost = async(req, res, next) => {
  const { title, slug, featureImg, keyword, preview, description, author, category, typeContent, tag, content, modeFetch, modePublish } = req.body;
  try { 
    const post = await Post.create({
        title: title, 
        slug: slug,
        featureImg: featureImg,
        keyword: keyword, 
        preview: preview, 
        description: description, 
        author: author, 
        category: category, 
        typeContent: typeContent, 
        tag: tag, 
        content: content, 
        modeFetch: modeFetch,
        modePublish: modePublish
    });
    if (post) { 
      res.status(201).json(post);
    } else { 
      next(customError('Post cannot created'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const getAllPost = async(req, res, next) => { 
  try { 
    const posts = await Post.find({}, 'title slug featureImg preview description author category typeContent tag datePublish');
    if (posts) { 
      res.status(200).json(posts)
    } else { 
      next(customError('Cannot get your posts'), 404);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const getPostSlug = async(req, res, next) => { 
  try { 
    const posts = await Post.find({}, 'slug');
    if (posts) { 
      res.status(200).json(posts)
    } else { 
      next(customError('Cannot get post slugs'), 404);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const getPostBySlug = async(req, res, next) => { 
  const { slug } = req.params;
  try { 
    const postBySlug = await Post.findOne({ slug: slug }, 'title featureImg content');
    if (postBySlug) { 
      return res.status(200).json(postBySlug);
    } else { 
      next(customError('Cannot get your post by Id'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}

const getPostBySlugForEdit = async(req, res, next) => { 
  const { slug } = req.params;
  try { 
    const postBySlug = await Post.findOne({ slug: slug });
    if (postBySlug) { 
      return res.status(200).json(postBySlug);
    } else { 
      next(customError('Cannot get your post by Id'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}

const editPostBySlug = async(req, res, next) => { 
  const { postSlug } = req.params;
  const { 
    title, slug, featureImg, keyword, preview, description, author, category, typeContent, 
    tag, order, content, imageUrl, modeFetch, modePublish
  } = req.body;

  try { 
    const postBySlug = await Post.findOne({ slug: postSlug });
    if (postBySlug) {
      postBySlug.title = title;
      postBySlug.slug = slug; 
      postBySlug.featureImg = featureImg; 
      postBySlug.keyword = keyword; 
      postBySlug.preview = preview; 
      postBySlug.description = description; 
      postBySlug.author = author; 
      postBySlug.category = category; 
      postBySlug.typeContent = typeContent; 
      postBySlug.tag = tag; 
      postBySlug.order = order; 
      postBySlug.content = content;
      postBySlug.imageUrl = imageUrl; 
      postBySlug.modeFetch = modeFetch; 
      postBySlug.modePublish = modePublish;

      const postUpdated = await postBySlug.save();
      return res.status(201).json(postUpdated);
    } else { 
      next(customError('Cannot delete your order'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}

const deletePostBySlug = async(req, res, next) => { 
  const { slug } = req.params;
  try { 
    const postDeleted = await Post.findOneAndDelete({ slug: slug });
    if (postDeleted) { 
      return res.status(201).json('Post deleted');
    } else { 
      next(customError('Cannot delete your post'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}

const addManyPosts = async(req, res, next) => { 
  const postArray = req.body;
  try { 
    await Post.insertMany(postArray);
    res.status(201).json('Posts inserted');
  } catch(err) {
    console.log(err);
    next(err);
  }
}


export { 
  createPost, 
  getAllPost,
  getPostSlug,
  getPostBySlug, 
  getPostBySlugForEdit,
  editPostBySlug,
  deletePostBySlug, 
  addManyPosts
}