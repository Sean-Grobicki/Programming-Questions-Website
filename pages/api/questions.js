const SERVERURL = 'http://localhost:3333';

const get = async(route,header) =>
{
    return fetch(SERVERURL + route,
            {
                headers: header,
            })
            .then((response) => response.json())
            .catch((error) =>{
            console.log(error.message);
            });
}

const post = async(route,headers,body) =>
{
    return fetch(SERVERURL+route,
        {
          method: 'POST',
          headers: headers,
          body: body,
        })
        .then((response) => response.json())
        .catch((error) => 
        {
          console.log(error.message);
        });
}


const getJSONProgrammingPost = (flowchart,answer) =>
{
  var JSONArray = [];
  flowchart.forEach(node => {
      JSONArray.push({
        "nodeID": node.nodeID,
        "nodeText": node.nodeText,
        "trueNodeChildID": node.trueNodeChildID,
        "falseNodeChildID": node.falseNodeChildID,
      });
  });

  var JSONObject = {
    "flowChart" : JSONArray,
    "questionCode": answer,    
  }
  return JSON.stringify(JSONObject);
}

module.exports =
{
    get: get,
    post: post,
    getJSONProgrammingPost: getJSONProgrammingPost,
};