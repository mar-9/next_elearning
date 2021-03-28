import Layout from '../components/layout'
import useSWR from 'swr'

export default function Home() {
  const { data } = useSWR('https://dn0fypjodt4sv.cloudfront.net/v1/scan-questions')

  return (
    <div>
      <Layout header="問題集" title="ITパスポート試験　令和3年春">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">
          {data != undefined ? data.message : 'error...' }
        </h5>
        <table className="table table-dark">
          <tbody>
            {data != undefined ? data.Items.map((value, key)=> (
              <tr key={key}>
                <th>問題 {value.no}</th>
                <td>
                  {value.question.map((value, key)=> (
                    <p>{value.text}</p>))}
                </td>
                <td>{value.answer}</td>
              </tr>
            )) : <tr><th></th><td>no data.</td><td></td></tr>}
          </tbody>
        </table>
      </div>
      </Layout>
    </div>
  )
}