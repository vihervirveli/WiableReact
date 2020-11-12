import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');
   //his.testingForBadWords = this.testingForBadWords();
    this.watchForSpace = ev => {
      if (ev.keyCode === 32) { //enter === 13
        ev.preventDefault();
        const tagiArr = this.props.tagList
        this.testingForBadWords(
            "#tagit","#tagitContainer", 
            "tagit", tagiArr)
        this.props.onAddTag();
        
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  
    /**
     * Function that will check the words typed by the user against a list of swear words and insults
     * @param {The starting position of where the temp div will be placed to notify the user of the swearwords they used} placeAbove 
     * @param {The ending position of where the temp div will be place to notify the user of the swearwords they used} placeBelow 
     * @param {The field in question: options are title, description, body, and tagit} curseField 
     * @param {Specifically for the tags} tagArray 
     */
    this.testingForBadWords = (placeAbove, placeBelow, curseField, tagArray) => {
        
      const badWords = 
      ["saatana",
      "saatanan",  
      "perkele",
        "perkeleen",
        "perhana",
        "perhanan",
        "vittu",
        "vitun",
        "helkkari",
        "helkkarin",
        "paskan",
        "paska",
        "perse",
        "perskule",
        "perskuleen",
        "perskutarallaa",
        "paskan",
        "hinttari"]
      
      //choosing which field was in question and placing the words from said field to fieldWords array
      let fieldWords;
      if(curseField === "title") fieldWords = this.props.title.split(" ")
      if(curseField === "body") fieldWords = this.props.body.split(" ")
      if(curseField === "description") fieldWords = this.props.description.split(" ")
      if(curseField === "tagit") { 
          fieldWords = tagArray
          const currentTag = this.props.tagInput
          console.log("print taglist")
          for (let i= 0; i < fieldWords.length;i++){
            console.log(fieldWords[i])
          }
          if (fieldWords.length === 0){
            fieldWords.push(currentTag)
          }
          
              
      }
      

      if(fieldWords.length > 0){
      //array where we collect the used bad words
      const usedBadWords = []
      let currentWord
      for (let i= 0; i < fieldWords.length; i++){
        currentWord = fieldWords[i].toLowerCase()
        if (currentWord.length > 1){
        let indexi = badWords.indexOf(currentWord)
        
        if(indexi > -1){
          usedBadWords.push(currentWord)
          console.log("added to usedBadWords")
        }
      }
      }

      console.log("usedBadWords")
      console.log(usedBadWords)

      //making list elements of the elements in usedBadWords and putting them to a ul
      const ul = document.createElement('ul')
      if (usedBadWords.length > 0){
        for(let i=0; i < usedBadWords.length;i++){
          let li = document.createElement('li')
          li.key = i
          li.appendChild(document.createTextNode(usedBadWords[i]))
          ul.appendChild(li)    
             
        }
        
       //setting up the elements to the div and then showing it to the user for 4 seconds 
      const div = document.createElement('div')
      div.className = `swearwordTimeOut`
      let msg = `Hei, huomasitko, että käytit seuraavia kirosanoja
      kirjoituksessasi?`
      div.appendChild(document.createTextNode(msg))
      div.appendChild(ul)
      const form = document.querySelector(placeBelow)
      const container = document.querySelector(placeAbove)
      container.insertBefore(div, form)
      setTimeout(function(){
        document.querySelector('.swearwordTimeOut').remove()}, 4000)
      }
      
    }
  }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  
  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div id="containerSwear" className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form id="titleAlertForSwearWords">
                <fieldset>

                  <fieldset className="form-group">
                    <input                      
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                      onBlur={() => {this.testingForBadWords("#containerSwear","#titleAlertForSwearWords", "title", [])}}/>
                  </fieldset>

                  <fieldset id="description" className="form-group">
                    <input
                      id="descriptionContainer"
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription} 
                      onBlur={() => {this.testingForBadWords("#description","#descriptionContainer", "description", [])}}/>
                  </fieldset>

                  <fieldset id="body" className="form-group">
                    <textarea
                      id="bodyContainer"
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}
                      onBlur={() => {this.testingForBadWords("#body","#bodyContainer", "body",[])}}>
                    </textarea>
                  </fieldset>

                  <fieldset id="tagit" className="form-group">
                    <input
                      id="tagitContainer"
                      className="form-control"
                      type="text"
                      placeholder="Type in your tags & press space between tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForSpace}
                                            
                       />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
