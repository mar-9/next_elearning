import Layout from '../components/layout'
import useSWR from 'swr'
import React, { useState } from 'react';

export default function Home() {
  const { data } = useSWR('https://dn0fypjodt4sv.cloudfront.net/v1/scan-questions')
  
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [score, setScore] = useState(0)

	const handleBackButtonClick = () => {
		const nextQuestion = currentQuestion <= 0 ? 0 : currentQuestion - 1;
    console.log(nextQuestion)
    setCurrentQuestion(nextQuestion)	
	}

	const handleNextButtonClick = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < data.Items.length) {
			setCurrentQuestion(nextQuestion)		
		} else {
			alert('全ての問題が終了しました。');
		}
	}
  
  return (
    <div>
      <Layout header="問題集" title="ITパスポート試験　令和3年春">
        <div className="container bg-white p-4 padding text-center">
          <h5 className="mb-4">
            {data != undefined ? data.message : 'error...' }
          </h5>
          <div class="row">
            <div  class="col-sm-12">
              <p>問題 {data.Items[currentQuestion].no}{data.Items[currentQuestion].question[0].text}</p>
            </div>
          </div>
          {data.Items[currentQuestion].question.filter((q) => q.id!=0).map((q, key)=> (
            <div class="row">
              <div class="col-sm-1  text-center">
                <input type="radio" name={"ans_" + q.id} value={"ans_" + q.id}></input>
              </div>
              <div class="col-sm-1  text-center">{q.id}</div>
              <div class="col-sm-10 text-left">{q.text}</div>
            </div>
          ))}
          <div class="row">
            <div class="col-sm-12  text-left"></div>
          </div>
          <div class="row">
            <div class="col-sm-2  text-left">答え</div>
            <div class="col-sm-10 text-left">{data.Items[currentQuestion].answer}</div>
          </div>
          <div class="row">
            <div    class="col-sm-2"></div>
            <button class="col-sm-3 btn btn-primary" onClick={() => handleBackButtonClick()}>戻る</button>
            <div    class="col-sm-2"></div>
            <button class="col-sm-3 btn btn-primary" onClick={() => handleNextButtonClick()}>次へ</button>
            <div    class="col-sm-2"></div>
          </div>
        </div>
      </Layout>
    </div>
  )
}