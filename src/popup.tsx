import { useState } from "react";

function TabPage() {
  const [data, setData] = useState("")
  const [list, setList] = useState([])
 
  function SearchBookMarks(value) {
    setData(value)

    let arr = []
    chrome.bookmarks.getTree(function(res){
      if(!Array.isArray(res)){
        setList([])
        return
      }

      function search(res) {
        if(Array.isArray(res)){
          for(let item of res ) {
            if(item.url && item.title.indexOf(value) > -1){
              arr.push({
                title: item.title,
                url: item.url
              })
            }
            if(Array.isArray(item.children)) {
              search(item.children)
            }
          }
        }
      }

      search(res)
      setList(arr)
    })  
  }

  function showSearchData() {
    if(!list.length) {
      return null
    }

    return (
      <ul style={styles.list}>
          {list.map((item, index) =>
            <li key={index} style={styles.item}>
              <a style={styles.link} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </li>
          )}
        </ul>
    )
    
  }

  const styles = {
    box: {
      display: "flex",
      width: "500px",
      flexDirection: "column",
      'padding-bottom': '20px'
    },
    ipt: {
      width: '200px'
    },
    list: {
      'list-style': 'none',
      padding: 0
    },
    item: {
      'line-height': '36px'
    },
    link: {
      'text-decoration': 'none'
    }
  }

  return (
    <div style={styles.box}>
      <h3 >
        搜索书签
      </h3>
      <input style={styles.ipt} onChange={(e) => SearchBookMarks(e.target.value)} value={data} />
      {showSearchData()}
    </div>
  )
}

export default TabPage
