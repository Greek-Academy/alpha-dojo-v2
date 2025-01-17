import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Language } from '@/lib/languages';

const defaultValue = `class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    int len = nums.size();
    vector<int> res;
    
    for (int i = 0; i < len; i++) {
      for (int j = i + 1; j < len; j++) {
        if (nums[i] + nums[j] == target) {
          res.push_back(i);
          res.push_back(j);
          return res;
        }
      }
    }
    
    return res;
  }
};
`;

export const CodeEditor = ({ language, ...props }: EditorProps) => {
  return (
    <Editor
      defaultValue={defaultValue}
      language={language || Language.typescript.id.monaco}
      {...props}
    />
  );
};
