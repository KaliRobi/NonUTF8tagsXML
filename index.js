const noInputXmlHmt = `
        <div class="noInputMessage">
                <div>
                    <p class="noInputText">It seems the input xml is missing!</p>
                </div>
                <div class="noInputButtonContainer">
                    <button id="noInputButton" >OK</button>
                </div>
        </div> `


const reverseSystemMessageDisplay = () => {
        let containerDivConent = document.getElementById('SystemMessageConsole')

        if(containerDivConent.innerHTML.trim() !== ''){
            containerDivConent.innerHTML = ''
        }
        else {
            containerDivConent.innerHTML = noInputXmlHmt
            document.getElementById('noInputButton').addEventListener('click', reverseSystemMessageDisplay) 
        }   

}

const getTagList = (xmlText) =>  xmlText.match(/<[^>]+>[^<]*<\/[^>]+>|<[^>]+\/>|<[^>]+>/g)

const  getText =() =>  document.getElementById('inpo').value   

const addHTMLTags = (tag) =>  `<p class='displayedTag'>${tag}<p/>`
    
const isInputPresent  = (inputForm) =>  inputForm.trim().length > 0

const returnIncorrectTags = (listOfTags) => {
    let invalidtags = []
    invalidtags.push("please check the following tags and their origins:")
    for(const element of listOfTags){
        if(element.match(/[^\x00-\x7F\u00A0-\u024F]+/g)){
            invalidtags.push(addHTMLTags(`${element.replace(/</g, "&lt;").replace(/>/g, "&gt;")}` ))
        }
    }
    
    return invalidtags
}

const displayTagsWithIncorrectCharset = (finalList, displayElement) => {
    finalList.forEach(e => {
        displayElement.innerHTML += e
    } )
 
}

const runProcess = () => {
    let outputElement = document.getElementById('outputElement')
    outputElement.innerText = ''
    let runningString = getText()
    console.log(runningString)
    if(isInputPresent(runningString)){
        const tagList =   getTagList(runningString)
        console.log(tagList)
        const tagsWithIncorrectCars = returnIncorrectTags(tagList)
        if(tagsWithIncorrectCars.length === 1){
            outputElement.innerText = "XML file passed the UTF-8 check"
            return
        }
        displayTagsWithIncorrectCharset(tagsWithIncorrectCars, outputElement)
        return
        
    } else {
        reverseSystemMessageDisplay()
        
        
    }
   
}


document.getElementById('pres').addEventListener('click', runProcess) 







