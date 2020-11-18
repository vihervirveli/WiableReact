import React from 'react';
import agent from '../agent';
/**
 * Class where one passes the field props, checks them for swear words
 */
class SwearWordComponent extends React.Component{
  
/*
  constructor(props){
    super(props)
    console.log("swearwordcomp this.props")
    console.log(this.props)
    
}

componentWillMount() {
    console.log("componentwillmount moi")
   console.log(this.props.title)
    /* if(this.props){
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);

  }*/


  swearWords() {
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
      "hinttari",
      "runkkari",
      "paskanmarjat"
    ]
    let title = this.props.title ? this.props.title : "";
    let description = this.props.description ? this.props.description : "";
    let body = this.props.body ? this.props.body : "";
    let tagit = this.props.tagit ? this.props.tagit : []
    let fieldWords = ''.concat(
        title.split(" "),
        ' ',
        body.replace(/\n/g, " ").split(" "),
        ' ',
        description.replace(/\n/g, " ").split(" "),
        ' ',
        tagit.join(' ')
        )
      
    const fieldWordsArray = fieldWords.split(",")
    console.log("fieldwordsarray")

    console.log(fieldWordsArray)
    return fieldWordsArray.filter(word => 
      {
        let wordTrimmed = word.trim()
        console.log("check bad words")
        console.log(badWords.indexOf(word))
        console.log(word)
        console.log(word.length)
        return badWords.indexOf(wordTrimmed) > -1
      })
  }

  swearWordsContent () {
    const swearWords = this.swearWords()
    
    const style = {
        backgroundColor: '#f1f12b', 
        color: 'black',
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        borderRadius: '5px',
        paddingLeft: '5px',
        paddingTop: '5px',
        paddingBottom: '5px'
    }
    const styleUL = {
        listStyleType: 'square',
        listStylePosition: 'inside',
        paddingLeft: '10px',
        paddingBottom: '5px',
    }
    if(swearWords.length > 0 ){
        return (
            <div style={style}>
                Hei, huomasitko, että käytit seuraavia kirosanoja kirjoituksessasi?
                <ul style={styleUL}>
        {swearWords.map((word, index) => <li key={index}>{word}</li>)}
                </ul>
            </div>
        )
    } else {
        return null
    }}
 
      render(){
        console.log("this props renderistä swearword")
  console.log(this.props)
        return(this.swearWordsContent())
    }
}

export default SwearWordComponent