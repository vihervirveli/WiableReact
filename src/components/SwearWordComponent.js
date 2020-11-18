import React from 'react';
import agent from '../agent';
/**
 * Class where one passes the field props, checks them for swear words
 */
class SwearWordComponent extends React.Component{
constructor(props){
    super(props)

    this.title = props.title ? props.title : "";
    this.description = props.description ? props.description : "";
    this.body = props.body ? props.body : "";
    this.tagit = props.tagit ? props.tagit : []
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
  }

/**
   * Method that checks the words in the fields for bad words and returns an array
   * with the used bad words
   */
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

    let fieldWords = ''.concat(
        this.title.split(" "),
        ' ',
        this.body.replace(/\n/g, " ").split(" "),
        ' ',
        this.description.replace(/\n/g, " ").split(" "),
        ' ',
        this.tagit.join(' ')
        )
        console.log(fieldWords)
    const fieldWordsArray = fieldWords.split(" ")
    console.log(fieldWordsArray)
    return fieldWordsArray.filter(word => badWords.indexOf(word) > -1)
  }

  /**
   * Gets the used swearwords from another method and renders them on to the screen
   * for the user to see
   */
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
        return(this.swearWordsContent())
    }
}

export default SwearWordComponent