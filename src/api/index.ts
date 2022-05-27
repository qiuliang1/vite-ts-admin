import request from '@/utils/request'

interface ITest {
  [propName: string]: any
}

export function test(query: ITest): Promise<any> {
  return request({
    url: 'https://c4b2e5aa-a74e-49dc-b481-cf1b07c89556.bspapp.com/submmitXunjian',
    method: 'POST',
    data: query
  })
}
