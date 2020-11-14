import React, { useState, useEffect } from "react"

import Header from "./header";

export default function QuestionSelection({id, headerText, optionsArray, onClickHandler, next}) {

  const createChoiceButtons = () => {
    return optionsArray.map(
      (option, key) => 
      <button key={key} className="choiceButton" onClick={() => onClickHandler(id, option, next)}>{option}</button>)
  };

  const choices = createChoiceButtons();

  return (
    <div className="question">
      <Header headerText={headerText} />
        {choices}
        <br />
        <button className="skipButton" onClick={() => onClickHandler(id, null, next)}>Skip</button>
    </div>
  )
}

export function QuestionDropdown({id, headerText, optionsArray, onClickHandler, next}) {

  const createOptions = () => {
    return optionsArray.map(
      (option, key) => 
      <option key={key}>{option}</option>)
  };

  const options = createOptions();

  return (
    <div className="question">
      <Header headerText={headerText} />
      <select className="choiceDropdown">
        { options }
      </select>
      <button className="selectButton" onClick={() => onClickHandler(id, null, next)}>Select</button>
      <br />
      <button className="skipButton" onClick={() => onClickHandler(id, null, next)}>Skip</button>
    </div>
  )
}

export function QuestionMulitple({id, headerText, optionsArray, onClickHandler, next}) {

  const [ isSelected, setIsSelected ] = useState(Array.apply(Array(optionsArray.length)));
  const [ triggerRefresh, setTriggerRefresh ] = useState(false);

  useEffect(() => {
  }, [triggerRefresh])


  const handleInputChange = (index) => {
    const newValues = isSelected;
    newValues[index] = !newValues[index];
    setIsSelected(newValues);
    setTriggerRefresh(!triggerRefresh);
  }

  const createOptions = () => {
    return optionsArray.map(
      (option, key) => (
        <button
          key={key}
          className={` ${isSelected[key] ? "selectedButton" : "choiceButton"}`}
          onClick={() => handleInputChange(key)} >{option}</button>
      )
    )
  };

  let options = createOptions();

  const getValues = () => {
    const searchValues = [];
    optionsArray.forEach((option, key) => {
      if (isSelected[key]) {
        searchValues.push(option)
      }
    });
    return searchValues;
  }

  const handleNext = () => {
    const values = getValues();
    onClickHandler(id, values, next);
  }

  return (
    <div className="question">
      <Header headerText={headerText} />
      { options }
      <br />
      <button
          className="nextButton"
          onClick={() => handleNext()} >Next</button>
          <br />
      <button className="skipButton" onClick={() => onClickHandler(id, null, next)}>Skip</button>
    </div>
  )
}