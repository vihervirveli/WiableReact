import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleMeta = props => {
  const article = props.article;

  let imgavatar = article.author.image;    

  if (!imgavatar) {    
    //article.author.imageClass = " nolog"
    imgavatar = "https://static.productionready.io/images/smiley-cyrus.jpg"
  } 

  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={imgavatar} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
