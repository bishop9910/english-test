function check(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = arr.length - 1; j > 0; j--){
            if(arr[i].word && !arr[i].phrase && !arr[i].clause){
                if(arr[i].word == arr[j].word && i != j){
                    console.log(arr[i].word+" "+i+" "+arr[j].word+" "+j)
                    return false
                }
            }else if(arr[i].phrase && !arr[i].word && !arr[i].clause){
                if(arr[i].phrase == arr[j].phrase && i != j){
                    console.log(arr[i].phrase+" "+i+" "+arr[j].phrase+" "+j)
                    return false
                }
            }else if(arr[i].clause && !arr[i].word && !arr[i].phrase){
                if(arr[i].clause == arr[j].clause && i != j){
                    console.log(arr[i].clause+" "+i+" "+arr[j].clause+" "+j)
                    return false
                }
            }
        }
    }
    return true
}