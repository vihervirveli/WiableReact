import React from 'react';

/**
 * Class where one passes the field props, checks them for swear words
 */
class SwearWordComponent extends React.Component{
  
/**
 * Checks bad words, filters out an array of used bad words
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
    let title = this.props.title ? this.props.title : "";
    let description = this.props.description ? this.props.description : "";
    let body = this.props.body ? this.props.body : "";
    let tagit = this.props.tagit ? this.props.tagit : []
    let fieldWords = ''.concat(
        title.split(" "),
        ',',
        description.replace(/\n/g, " ").split(" "),
        ',',
        body.replace(/\n/g, " ").split(" "),
        ',',
        tagit.join(',')
        )
      
    const fieldWordsArray = fieldWords.split(",")
  
    return fieldWordsArray.filter(word => 
      {
        let wordTrimmed = word.trim()
        let wordLC = wordTrimmed.toLowerCase()
        return badWords.indexOf(wordLC) > -1
      })
  }

  /**
   * Takes the used bad words array and depending on whether there are words or not,
   * spits out our component or null
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
        {swearWords.map((word, index) => <li key={index}>{word.toLowerCase()}</li>)}
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