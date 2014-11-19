(function() {
    var name = 'Aweiss.Utils.ArrayTools';

    var importList = ['Aweiss.Utils.Tools'];
    var browserList = [];
    var nodeList = [];

    OOPS.DEFINE(name, Class, importList, null, nodeList, browserList);

    function Class() {
        eval(this.magic);
        (function() {
            'use strict';

            Public.Static.search=function(array, num, min, max){
                //var _ = this.magic ? eval(this.magic) : this;
                if(num.constructor===Number) {
                    /*var nums = [num];
                    var results = _.multiSearch(nums);
                    return results[0];*/
                    return this.singleSearch(array, num);
                }
                else{
                    return this.multiSearch(array, num);
                }
            };

            /*Public.Static.singleSearch=function(num, min, max){
                var _ = this.magic ? eval(this.magic) : this;
                if(max===undefined) max=_.array.length;
                if(min===undefined) min=-1;
                var diff=max-min;
                if((diff===1||diff===0)){
                    return max;
                }
                else if(diff===2) {
                    var test= _.array[min+1];
                    if(num>test) {
                        return max;
                    }
                    else{
                        return min+1;
                    }
                }
                var start = _.getStartingIndexForNum(num, min, max);

                var test = _.array[start];
                if(_.array[start]<num){
                    return _.singleSearch(num, start, max)
                }
                else{
                    return _.singleSearch(num, min, start);
                }
            };*/
            /*Public.getMiddle=function(num, min, max){
                var _ = this.magic ? eval(this.magic) : this;
                /*debugger;
                var minVal = _.array[min]||0;
                var maxVal = _.array[max]|| _.maxVal;
                var ratio = Math.min(Math.max(((num-minVal) / (maxVal-minVal)),.1),.9)||0;
                var diff=max-min;
                var start = Math.floor(ratio * diff);
                if(start===0||start===diff){
                    start=1;
                }
                return min+start;
                return (min + max) >> 1;
            };*/
            Public.Static.singleSearch=function(array, num) {
                return this.singleSearch_(array, num, 0, array.length);
            };

            Public.contains=function(array, num){
                if(num.constructor===Number) {
                    return this.singleContains(array, num);
                }
                else{
                    return this.multiContains(array, num);
                }
            };

            Public.Static.singleContains=function(array, num) {
                var index = this.singleSearch(array, num);
                if(array[index]===num){
                    return true;
                }
                else{
                    return false;
                }
            };

            Public.Static.multiContains=function(array, num) {
                var indexes = this.multiSearch(array, num);
                for (var i = 0; i < indexes.length; i++) {
                    var index=indexes[i];
                    if (array[index] !== num) {
                        return false;
                    }
                }
            };

            Public.Static.getContained=function(array, nums) {
                var indexes = this.multiSearch(array, nums);
                var results=[];
                for (var i = 0; i < indexes.length; i++) {
                    var index=indexes[i];
                    if (array[index] === nums[i]) {
                        results.push(array[index])
                    }
                }
                return results
            };

            Private.Static.singleSearch_=function(array, num, left, right){
                //var _ = this.magic ? eval(this.magic) : this;
                //var left = 0;  // inclusive
                //var right = array.length;  // exclusive
                /*var minVal = array[left];
                var maxVal = array[right]||this.maxVal;
                var ratio = (num-minVal) / (maxVal-minVal);
                var diff = right-left;
                var steps = ratio * diff
                var middle = left+(steps|steps);
                var midValue = array[middle];*/
                //var steps;
                //var middle = (num / this.maxVal)*array.length;
                //middle =middle|middle;
                /*var fromCenter=num - (arrayLength/2);
                var diff=Math.floor(Math.pow(Math.abs(num - (arrayLength/2)),(1/2)));
                var middle=num;
                if(fromCenter<0){
                    middle+=diff;
                }
                else{
                    middle-=diff;
                }
                var midValue = array[middle];
                if (num > midValue) {
                    left = middle + 1;
                }
                else{
                    right = middle;
                }
                /*if (num > midValue) {
                    left = middle + 1;
                    var diff=right-left;
                    steps = Math.ceil(.001*diff);


                    while(right===arrayLength){
                        if(left===arrayLength-1){
                            return arrayLength-1;
                        }
                        middle = left+steps;
                        midValue = array[middle];
                        if (num < midValue) {
                            right = middle-1;
                        } else {
                            left = middle;
                        }

                    }


                } else {
                    right = middle;
                    var diff=right-left;
                    steps = Math.ceil(.001*diff);


                    while(left===0){
                        if(right===0){
                            return 0;
                        }
                        middle = right-steps;
                        midValue = array[middle];
                        if (num > midValue) {
                            left = middle + 1;
                        } else {
                            right = middle;
                        }
                    }


                }*/
                /*var index=Math.floor((num / this.maxVal)*array.length);
                var left=index-10;
                var right=index + 10;
                while(num>array[right]||num<array[left]){
                    left=-50;
                    right+=50;
                };*/
                /*var left = num>>1;//Math.max(num-100,0);
                var right = (arrayLength + num) >> 1;//Math.min(num + 100, arrayLength);
                while(num<array[left]){
                    left= left>>1;
                }
                while(num>array[right]){
                    right = (arrayLength + right) >>1
                }*/
                //var left = min;  // inclusive
                //var right = max||array.length;
                while (left < right) {
                    var middle =(left + right) >> 1;//left+Math.floor((right-left)/2);//(left + right) >> 1;
                    //var middleTest =  left+Math.floor((right-left)/2);
                    var midValue = array[middle];

                    if (num > midValue) {
                        left = middle + 1;
                    } else {
                        right = middle;
                    }
                }
                return left;
            };



            Public.Static.multiSearch=function(array, nums) {
                var numsLength=nums.length;
                var results=new Int32Array(numsLength);
                this.multiSearch_(array, nums, 0, array.length, 0, numsLength, results);
                return results;
            };

            Public.Static.contains=function(array, num){

            };

            Private.Static.multiSearch_=function(array, nums, left, right, numsLeft, numsRight, results){
                //var left = min;  // inclusive
                //var numsMiddle = (numsLeft + numsRight) >> 1;
                //var num = nums[numsMiddle];
                //var results=[];
                //while (left < right) {
                    var middle =(left + right) >> 1;
                    var midValue = array[middle];
                    var numsMiddle = this.singleSearch_(nums, midValue,numsLeft, numsRight);
                    if((numsRight-numsLeft)>1) {
                        if(middle+1<right) {
                            var newLeft = middle;
                            var newRight = middle;
                            if ((numsRight - numsMiddle) > 0) {
                                this.multiSearch_(array, nums, newLeft, right, numsMiddle, numsRight, results);
                            }
                            if (numsMiddle - numsLeft > 0) {
                               this.multiSearch_(array, nums, left, newRight, numsLeft, numsMiddle, results);
                            }
                            //results.push.apply(results, lessThanResults);
                            //results.push.apply(results, moreThanResults);
                            //var i,l;
                            //this.pushResults(results,lessThanResults,moreThanResults)
                            /*var first = lessThanResults;
                            var second = moreThanResults;
                            var i,l;
                            for (i = 0,l = first.length; i < l; results.push(first[i++]));
                            for (i = 0, l = second.length; i < l; results.push(second[i++]));*/
                        }
                        else{
                            /*for (var i=numsLeft;i<numsRight;i++){
                                /*if(nums[i]===midValue){
                                    results.push(middle);
                                }
                                else if(nums[i]>midValue){
                                    results.push(right);
                                }
                                else{
                                    results.push(left);
                                }
                            }*/
                            for (var i=numsLeft;i<numsRight;i++){
                                //var result=left+1;
                                var result=this.singleSearch_(array, nums[i], left, right);
                                //results.push(result);
                                results[i]=result;
                                //results.push(result);
                            }
                            //return results;
                            //moreThanResults = nums.slice(numsMiddle, numsRight);
                            //lessThanResults = nums.slice(numsLeft, numsMiddle)

                        }
                    }
                    else{
                        //return [];
                        var result=this.singleSearch_(array, nums[numsLeft], left, right);
                        results[numsLeft]=result;
                        //results.push(result);
                        //var result=right;
                        //results.push(result);
                    }
                //}

                //return results;
            };
            /*Private.multiSearch=function(nums, min, max){ //nums received must be sorted
                var _ = this.magic ? eval(this.magic) : this;
                if(max===undefined) max=_.array.length;
                if(min===undefined) min=-1;
                var diff =max-min;
                if(diff===0||diff===1){
                    var indexes=[];
                    for(var i=0;i<nums.length;i++) {
                        var num = nums[i];
                        indexes[i]=max;
                    }
                    return indexes;
                }
                else if(diff===2){
                    var indexes=[];
                    var test= _.array[min+1];
                    for(var i=0;i<nums.length;i++) {
                        var num = nums[i];
                        if(num>test) {
                            indexes[i] = max;
                        }
                        else{
                            indexes[i] = min+1;
                        }
                    }
                    return indexes;
                }
                else {
                    var start = _.getStartingIndex(nums, min, max);
                    var test = _.array[start];
                    var results = [];
                    if(nums.length>0) {
                        var sortedNums = new _.maker(_.maxVal);
                        sortedNums.array = nums;
                        var testIndex = sortedNums.multiSearch([test]);
                        var lessThanResults = _.multiSearch(nums.slice(0, testIndex), min, start);
                        var greaterThanResults = _.multiSearch(nums.slice(testIndex, nums.length), start, max);
                        results.push.apply(results, lessThanResults);
                        results.push.apply(results, greaterThanResults);
                    }else{
                        if(test<num){
                            return [_.singleSearch(nums[0], start, max)];
                        }
                        else{
                            return [_.singleSearch(nums[0], min, start)];
                        }
                    }
                    //goog.array.binaryInsert(nums,test);
                    //var testIndex=goog.array.binarySearch(nums,test);
                    //goog.array.binaryRemove(nums,test);
                    //Tools.addProperties(results, lessThanResults);
                    //Tools.addProperties(results, greaterThanResults);
                    //var savedProto=lessThanResults.__proto_;
                    //lessThanResults.__proto__=greaterThanResults;
                    //greaterThanResults.__proto__=savedProto;
                    return results;
                }
            };*/

            Public.Static.add=function(array, num){
                //var _ = this.magic ? eval(this.magic) : this;
                if(num.constructor===Number) {
                   return this.singleAdd(array, num)
                }
                else{
                    return this.multiAdd(array, num)
                }
            };

            Public.Static.singleAdd=function(array, num){
                var index = this.singleSearch(array, num);
                if(array[index]!==num){
                    array.splice(index, 0, num);
                    return index;
                }
                else{
                    return -1
                }
            };

            Public.Static.multiAdd=function(array, nums){
                //var _ = this.magic ? eval(this.magic) : this;
                var results = this.multiSearch(array, nums);
                var added=0;
                for(var i=0;i<nums.length;i++){
                    var num = nums[i];
                    if(num!==nums[i-1]) {
                        var index = results[i] + added;
                        if (array[index] !== num) {
                            array.splice(index, 0, num);
                            added++;
                        }
                        else {
                            results[i] = -1;
                        }
                    }
                }
                return results;
            };

            Public.Static.multiMerge=function(array, nums, array2){
                //var _ = this.magic ? eval(this.magic) : this;
                var results = this.multiSearch(array, nums);
                var newArray=[];
                var i=0;
                var numCounter=0;
                while(numCounter<nums.length||i<array.length) {
                    if(array2[i-1]!=newArray[i-1]){
                        debugger;
                    }
                    if (numCounter < nums.length) {
                        while (i === results[numCounter]) {
                            var num = nums[numCounter];
                            if (array[i] !== num) {
                                newArray.push(num);
                            }
                            numCounter++;
                            while (nums[numCounter] === num) {
                                numCounter++;
                            }
                        }
                    }
                if(i<array.length) {
                    newArray.push(array[i]);
                    i++
                }
                };
                return newArray;
            };

            Public.Static.sort=function(){
                //var _ = this.magic ? eval(this.magic) : this;
                _.array.sort(function(a, b){return a-b});
            };


            Private.Static.getStartingIndexForNum=function(num, min, max){
                var _ = this.magic ? eval(this.magic) : this;
                return Math.floor(min+((max-min)/2));
                /*var minVal = _.array[min]||0;
                var maxVal = _.array[max]|| _.maxVal;
                var ratio = Math.min(Math.max(((num-minVal) / (maxVal-minVal)),.1),.9)||0;
                var diff=max-min;
                var start = Math.floor(ratio * diff);
                if(start===0||start===diff){
                    start=1;
                }
                return min+start;*/
            };

            Private.Static.removeDuplicates=function(array){
                var _ = this.magic ? eval(this.magic) : this;
                for(var i=0;i<array.length;i++){
                    var num=array[i];
                    var toRemove=0;
                    var next=i+1;
                    while(array[next+toRemove]===num){
                        toRemove++;
                    }
                    array.splice(next, toRemove);
                }
            };

            Private.Static.getUnique=function(array){
                var _ = this.magic ? eval(this.magic) : this;
                var newArray=[];
                for(var i=0;i<array.length;i++){
                    var num=array[i];
                    newArray[i]=num;
                    while(array[i+1]===num){
                        i++;
                    }
                }
                return newArray;
            };

            Private.Static.getStartingIndex=function(nums, min, max){
                var _ = this.magic ? eval(this.magic) : this;
                var average=0;
                for(var i =0;i<nums.length;i++){
                    var num = nums[i];
                    average+=num;
                }
                average=average/nums.length;
                return _.getStartingIndexForNum(average, min, max);
            }
        })();
    }
})();