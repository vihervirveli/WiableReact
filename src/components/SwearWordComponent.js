import React from 'react';


class SwearWordComponent extends React.Component{
constructor(title, description,body, tagit){
    super()
    this.title = title
    this.description = description
    this.body = body
    this.tagit = tagit
}
/**
   * Method to check bad words used in the fields
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
    let titleC, bodyC, descriptionC, tagsC;
    console.log(this.title.length)
    if(this.title.length === 0 || typeof this.title === 'undefined' || this.title === null){
      titleC = ""
    }else {
      titleC = this.props.title.split(" ")
    }
    if(this.props.body.length === 0){
      bodyC = ""
    }else {
      bodyC = this.props.body.replace(/\n/g, " ").split(" ")
    }
    if(this.props.description.length === 0){
      descriptionC = ""
    }else{
      descriptionC = this.props.description.replace(/\n/g, " ").split(" ")
    }
    tagsC = [...this.props.tagList]
    let fieldWords = ''.concat(titleC,' ',descriptionC,' ',bodyC,' ',tagsC.join(' ')
        )
  
    const fieldWordsArray = fieldWords.split(" ")
    return fieldWordsArray.filter(word => badWords.indexOf(word) > -1)
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
    if(swearWords.length > 0){
        return (
            <div style={style}>
                Hei, huomasitko, että käytit seuraavia kirosanoja kirjoituksessasi?
                <ul style={styleUL}>
                    {swearWords.map(word => this.swearWordItem(word))}
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