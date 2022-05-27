import request from '@/utils/request'

interface ITest {
  [propName: string]: any
}

export function test(query: ITest): Promise<any> {
  return request({
    url: '/getXunjianCheck',
    method: 'POST',
    data: query
  })
}
