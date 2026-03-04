import { useState, useEffect, createContext, useContext, useRef } from “react”;

// ============================================================
// LOGO
// ============================================================
const LOGO_B64 = “iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAz50lEQVR42tW9d3hdV5X+/9n7tNtVLRe5Se4t7t2OS3onIZQQBgihBAhDQgkEUhwmhBqGFjoDCYQwKaT3bjtx770XybZktSvp1lP2/v1xrmR7JnHCTJjn+7vPo0eWde85+6y99irveteS0Fpr/qkvDaVbaCFRgAQEGlQz5A9BphE6DuJ2dVDoypHLdFPIZ1G+B4A0LSLRONF4kmgqhl1WARVDIVELsToQNWjEiWtrFd5aSP7ZL/HPE2AoOC0kGhCA0J2Q2wnHN9N9cDuH9zZx6GAnDYd9WtOKljZNPifxtSAIBDoUM4YAw1BIrYlGFTXVgsoywaDBJkPryhk4rB/ldWOh7xkQH4smedI9FQhR+un/FwI8VXBSu5DdCI3LaNy8kQ3rmtm81eVQo6Sj28QPQn00DDBNkDLUTlF6XiHA9cLHNwxBoMD3IQjC3xvCpzwVMGSA4ozxFpOnDWDwpIkwaB7EJ6Ow/qmCfG8FqNUJwaluaH+VzOYXWPX6Xpavctl7yCSTNzCkwLY1lglC6FDm9J703u9SQi6vGT/aIpfXHGwIiDilhYdbhRAC34dMDpSCVNynfqDPnJkOcxaNIDXxbKhejBLJkwQp/18TYHgJhUAGWWh7lpbVz/D804dZvgqa2ywsSyBQOE4omB4NOu3iBGQymnt+VM7aDS6/uy9HZYXo/ayUUChohBAM6CvJFTSt7RppSDxXU13uMm8GnHvxEPrPvhD6XIgSMaTWJUUU/w8IsKR1aBDpl+ja8DBPPbSXF5cJ0t0m0Sg4tqZYgAnjTPYfDOjOKhxLoE5zZykhm9NMHGcxZ7rN8GEm3/q3rl7lkRLyec2QQSZXXBpl7z4P19Nkc5o3V3lEouC5glxekIp7LJqjuPSDI6ic+SF02aLSw//vtVH+77ROoYREFBsR2+7g5Z/8gJu+to8Hn7FxA5OylMY0NFpDd0Zx5qwI3/xaCt+FQNNr597qFQSQiAsmjrf484N5EgnBGePDo2wY4HlQlpJ8/cYEb64s8tDjBZ56vkhZQvLF6+K4RTCkpiylCDB5/EWHm766j2e//13E1jsR3hGUkKBV7wn6PxSgAgRKS2T78xx75ia+8/XXuedek66MSXlKYQhNEIT2TClIJCTb93n4SvP1G5NkM6Fg30qIhoRsVjNpgkWqXDJ3lkU2p5k/yyYIwJCCbFZz2UVROtoVrywrUl0liEYFb6xy6erU+L5GlEyFIBRk0Tf57f0mt934Cocf/Sqy4/lQiL0W9f9CgFqhkeigiDz4U5b+6m6+eWsbG3ZEiEYCTLMkuJPFrSAaBR3And/pYvIki5tvTJLp0qUHPPXl+tCnWjJ1ks1vfpflqecL/PaPOaZPtampkhSKoQ0bWitpblZYpkBrMA1wfc3DT+SwbYFSJ457EEA+r0jGFTv2R/jWbW289JMfIff/HK08NKKkjf9MAZbsnXBbEJtv4U93PsFPf2+SLQhsM2BQrfn2R9KHiWNNLrs4yk/uyTB0iMGNX0xgGKfaciEg8DUTxllYDgwfZmBZgooyQWtWc/ZCp1drG5sU9XUGRVdTKIRf+bymWDyh2YYR2krf01x4XoShQwxMGYBh8Is/Wfz6tkcJNtyC8NtKtvwfE6KxZMmSJe9WeEpIZOEQhVW3cff3dvDSGw6JeEB5SvL5zyaYOcXm2ReLRCKCk12T0hCPCqoqJPc/nGf3Xh/PhYsvjdHRHtDQEGDIUFMoxXsNRwJWrHTJFzRSCDo6NM8+W6ClQ6FU+N69+30Wz48wdLDJ4QbFoIEmA2sNjrcoTDPU/HRaM3K4yYXnRnj/ZVGee7FIZ5fCsiAa0WzdY7Nn0yGmDtqAUzsRZZafFDO+VwLsEV5+L93LlnDXnY1s2GFTUabwfUE8JjhyTHHJeRHSac323R6xiOg9vlpBPCa56PwIR48F+AFoNI89nmfHLp9AQaEAuTz4QXgspBCYhsDzQvNUcDWuB60tKgysJbiuZtkKl5oaydhRFrYD+w4E5PKaTFbjWIJrPhqjT5XBytUuEydYPPVsHo1A9G6s5nCTxcZVrUwbuIb4kEkos/JdC/Gdw5ieY1s4RNfrt/BvdzZx4KhFWVLh++FbfB860orLLohy7cdjXHdDmkIxNORnnenw+nKX2oEGY0eabN7q0dyqyGQ1SmnKyyT9awwGDzYYUmvQt59BeVIQiwgcW+A4AtfX5PKa422K400BB44EHDgQ0NwS0NmlKBRCj20YIA2I2IIpU2zGjTTZusMnlRAMGmhQ29/g1u90EY+fsI9CgFaavGswsNrj1tv6U3XuXShrIPJdhDmnF6DWaCHAa6Xw5k3825IGdh+yMGRAsRiGMpYliMfDnUqnNXfekgIBX7opzcxpDldcEuHH93Rj2YLOTo0faMqSktGjTGZOtRk32qK2v4RyCQWNn9GYCQmuppBVHDgYYDuCeEJQWS6xUwIiAlxoPxKwaavHqrVFtu/2yeY0EUcgJZx/TgRLwp8eyGFI+O5tZXRlFN//STcVFTIMxkWYZ48dZbFuk4vSBoNqXJbcWUdq4XfRRjVCnz7eOo0Aw5xWKRc23cIP7tjA6s0OEStg4hk28+c5mFLzzHNFtmz3SCYFRVeTikv+/XvlrFzr0toasGKNS1NzgOtCRYVk3iybcxdHGDDShADIaTpaA377lxxHjwZ0ZTRXXBLhkg/G2PqGy01LOonHBaYtSMRCczF4kMGIepPJEywGDjMhImje6/P8K0WWLi/S2q5Aa/r1NXBdjWkIbv5aijfeLPLwE3nKUgIhwkA9ERX85O5ynnqqwKNP50GajKvLc8t3p2FM/TcEFuI0OfTb20CtCZAYB3/OvT96nZdXRnHsgBlTbeqHmGzb5VNVZnDNNXE62hTbd/ok4pKOtKKiTHC8RfH4M3la2zS2KTjvrAjXfybBnDMjKFfz6EN53KxmwGADQwiyOc1ry4toBes2eESAIQNNXl9RJJ4IbVbRDQPyg4cD1m3yeGWZy8oVRTpbFMPqLWafE+GsmTYAR48p0p0hJjNyuMX8BTZvLi/ScDQgHhN0dWtqKgy+990y9uz12b/Pp0+VwfHjHsdaHdINh5gxOYuunHXajOWtNbDHabQ/z7Jf/pB//71DNBLQp0oyfozF48/ksR1BPqeZN8vhxi/E+frtnRxv1USjYJiC9jaFBiaMsbjmX2LUjbagqNm0weU7d2coepp4THD9Z+PMmRcBNBvWuvz4Zxl8pdFaMHq4yf5Dfm9MeTJCI0TooIpFjetqkknJrGk2V1wapd8Yi8atLn/8c44Nm0Mop7avQVW1YMcun1wezhhrcuu3Uqxc6fKL32TwPPjkx2K8/FqRtg5FNif53NUu5930DVT52W9rD/+7BpachnQbaXru+/zg5x6WFaIiE8ZYGBL2HQ6oqgxt3/adPomkoLrKYOt2n2hUkM+F8dcH3xfl+i8niUrBkYM+5RWSygpJLCbYscvDMAQrVrmUxQTD6k369zcYN9pizTqPoqfpSOu33Hh9AqPFNMMMJAhg5x6f15YVybcp5syyWXhOFEfCrt0+mZyitV0xoJ/BuWdFuO4zCZ5+tsCvf5elolJQKGimTbapqTHYsNGjLCVYv0UwbcA2KsbMQRtlb+mZ3+II63DHd9zNT3+4i4Zmi1hE4/kQjUqu+kCU5Stcurs1jiN6/9/zNUePBWgtsC244fNJzr0kyvo3i/zwpxmefanAiHqT/oMNRo20qK4wWLPWw7Jh5WoPA8HYMRbVpQxk42aPdJfCsU+NKd/G2iAERKPhezdsdlm1xmNwP4P5l0QZMcBg85YQbMjn4bKLImzd5vOzX2UYUCvJFzTKF3zuU3H27gvYvtMnHoO8a3BgXxcLprYh+i0oATinE6AOUMJAdr7MK79/gMdfdohFArxAEI0IGo8GTBxr8eEPx9m7N6CpOaBftcGkcRYrV4cLLEtJbv16inETLIKM5tWlRZaucIlEBEvfcOlXLRk82KSuzmTIIIOVqz1MW7Bho0cup5k0wSZVJpk5zWbXXp+2NoVhvLugtkfQ8ZigI614fblLVMH8CyJMHmuxYZNHe4di3UaPPlWhare2KqIRwdduTFJVafCr32cxzPBajq1paLJI+gcYPXMwKlKP0MEpR/kkAYYhiwgydL9xNz/9VRf5AtQNMYnYgnSXJhoRrFzrMWSgwUevijFlks2gAZKXlxY53qqorpTc/q0UgwaZ5NMKyxZMnGxTlhCsXR9q2xsrXBJRyYgRJrUDDcaNNFm9xkML2LHL53irYuoZFvEqSW2lwUuvFbGdd9bCU6AODZYlkAasXOWSSysWnBNh2kSLjZs82tOKjg7F9Ck2c2c5XHFFlEDBD3+coTOjsK0wFFIqzK9379fMG3WY2IizQNglfyz+iwBLMLw8/hgP//Il1myxiTiaq66IUVYm2bjZIx4PH2T5my6rVrvs3O3x2hsuHZ2KRFxwy00pBg0z+dkvunnq+SKzZtnYQjBqjEVNlcGqtR6WI1iz1kUFoYOp7mswebzF2g0urgsHDvrsP+Azc6ZDd4fmpdeL2PY/JsBTjnVMsHGLR2erYsE5USaMtli9xiXdpdi73+fI0YA3Vnk8/XQB1w/NgO9Dd7dm0ZkOTc0B6S4Tv+s40+aWoRPjT4kNSwIMhSeCTtpf+xm//lMOIcGyYcNGj0RckEgIjjUpYlGB7Qg6uzRtbQrLEgQ+fOm6JOPm2Dz21zx/fThPvqjZsM5n6lSbmA1D601G1BmsWusiDcGWrR6dnYpJ420qqiXTJ9ls3uzRnYUjTQH79/gMHGiwYo2LYf7PkWOtIRYTbNnmUejSLLgwQn2NwbKSWcnmoJDXxOOh1nV2hnHj+WdHuPaTCXbt9DnWHNDUIpkx7ChlYxejRLRU7hIlAfZ43rZnePQ3L7Nuu000opkzw6Yzo+hIa86c67Bnr0+6M8yBHCdMszq7NB+6LMq5l0ZxWxX9aw3aWhRHjgVk85pVa1zOmGhTFhf062cyfpzFmrUugYLd+3waDgdMnWhTXhWGIbt2ebR1KNo6NJu3eUgD/rdFhx4hbtzsU27B3EuiOJ5m5drwVJkm5HIatOD8cyPc8K9JRg03efChPJUVgsMNAd15A11sZ+q8Puj4mF4tNJYsuX2JFgKpXbpX3sMf7k2TywumTba4/jMJ5s90mDvTZuRwk0ULHDo6NINrDbozmvZ2zbjRJl+4Pkn6aKidsZhkzmyb480B+w8HuJ7mzZUuY0dbVFZJqsol06farF/vkS9qGo4E7NjlM3WiRVmlZPYMh8aGgEMNQYiovIc1Q8cRrNvkMWGoydzFEfbu8jjUEBCLST50eZSPfyLByHqTg4d87vtLjoefyFNfZ1E/1GTvPp/2Ds28cR3ER5yDFiYCgbHk9luXaCER2XUsu/9RXl1hkIxDKil57MkCL75aZPkKlxdfLuD7cN11SQ4d9Fm1ziPqCL56fZJkueQbt3VyvFUxeaqNcgWzZ9l0ZxQ7d4WI6bI3i9QNMeg3wCAREcyZ7bBzp097WtHWodiw0WPSeIvyasnsqTbtHYodu30c570rQ0oZAh979vosXBBhVL3JshVF2kqKUChqvnV7J7t2B9xwfaJk28N6T+NRn2zRpDLazug5Y9H2QIQOMJbcfvsShEDsu5/7/rCbtrSFbWuONgVk85AvaDJ5TcHVrFrn0d2hWb/Jpb1Dcd7iCGddEeWB32dZvtrl4OGAtlbFjGk2yoNp0x1QsGmLh2EKli136d/HYHC9iS1h/jyHA4cCjhwNyBVCjzlmuEVVP4MZU2zyOc3OXX6vE5HyVOBVyhPH++SfpTyRrZx8/IWASCS05TKAORdFybcqtu30aG5R9KuWbNkW2t7jLYrdewKONQfs3e8Ti4YljO6uIovnWMi+c8Na9e1L7lgiVCcNr/6BBx8tYNuidPNw522bUv1WkIwLjjQFZHOQTAiu/3QCxwxhpx07fTwf9uz3aWgImDHDRgQwYZJNIipZu8HFdgRvrCySSkhGjLbAE8ybZ9PWGnrEQMPyN1zqBhn0G2GSlIKXXi9ilQSYzYZQvmUKXFdTKIbhihCUUOkwMykUw4DZD8Au/R7CEmkuB5EIHDgUMHeixbjxFm+udGluUQwZZHLJJRG2bffYsMnDKIGyPeUBw4T2tGDyyG6qJp6DEhGMW5csWSIz61j6wDOs3mQSdTRdXWFAnEhKOtOKQjG0H6qUyWSymrPOjDD/nAgyD336GUydYrNhg0cuDw1HA3bt9Jkxw8YERo216FdtsGqdi2ULVq91MaRg/AQLVYRZsx3cImzbETqNZW+6DOlvUB4XPPtKMYzpJEwebyMQtKcVgweajKwzae1QeL5m8ACTkfUm7WnFiDqL8aMtkilJU3OAkOHaz14UYdp0i6605lizQgWaOedF6WxW7Nrt03A04Nhxhe+GYV6PxgeqFFg70J2VVMe7GL9gHNoeFHph0fgUD9+7heMdNlprrv1onE9eE+fsBREWLXTIZjR794f2KKxJCz5/bZxiHnbu9hhQG9q12bMctm3z6OhStLYpNm7ymTbNJmbCkHqT+sEmK9e4mCZs3OSRz2qmTLXx8prJ02yitmD9Jg/TEqxZE8L5zS2KQjGs/97+vXJSNjzzQpEPXxnlmhuSrH+zyMHDAd/8cpJLL4/y4ksFvvrFJCPqLWbPthk0wODVpUW+8oUE8+bYpBKSygqDDZs9Wto1C6fa1A82eHlpEWlCul3T3qEoFkMk3YkIclnNeYsj1FQb7NytMGWRRQv6IKqmIwUB3Yd20tBk4rqKcxY5JJKCO+7sZsl3Onny6TzvvyzK7Ok2uZymWNSMqDcYOMbijTeK3P7dLpYtKyJsQSouuO1bKc4Ya6E0NBz1uf3OLo40KwhgyhSbb30tiWNJHEfwxLMFfn5PBsMW+DnNpZdG+eJnEyhfE2h4bUURaYTcmHGjTfZvdqmokJSnwrKm6lYMrzcpT0mqqyXtx0OHFSj4j79k+dbtXcyf7bBwjsOk8RZ33NXNZ7+Y5g/3ZkmlBOm04rVlRaqHm4wbY9LdrelTLbnmIzEuvSDCeedGWDjb4cd3lfHJTycoFCES0TQ2GbTu2wUoJEETDfuP09ohKS8DU8JPf5XhyDGfpuMBTz9f4M7vdTOszsS0woL2zKk2WsHSFUUiUcHPf53hyScKyIjAMeHmryaZO9PG86CtQ7Hkri727gvx/zGjLG7/ZpJUXGA78NobRX7w4258AUFes2CBw003JDEAKUMcUAATxlk880wBUwgG9DcAaDro07+vwZiRJm0dYZnANARoqK6WNB4N2Lc/YPFCh2PHFekuxRevS3DBORF8L0wUVq5xwYVZ0xzQIepUWSnZut1j21aPSZNt4uWSO5Z0smJ1kVQyZFwc3HMMVBOS/EEOHejE8w0iEUG+EAopGhNEIoK+NQZt6YCjxwJsSxCJwPgxFsILC9uWKbAcwR/vz/LXB3IYNggluOELSc4/26FY0GTzmju+18WGjR5IGDLQ4Nu3pRjQ18AwYe0ml+/8oIu8B6qgmTLF5vZvpihLhQ6holzQv8aguVkRCBhWZyIE7NsXrmnhPIetW/ywIilO1KKVCov0fqAxJCFfpkJy5SVRPA8ijuDwkYCm/T6TJ1ikkgLX0/z+viyplOQrX06SdzVfvSnNtp0eiYRAa43C4MC+TsgfQpJp5HBDEHqYdkW//pKLL4iQ6Q4D5WNNAVMnWlRWSNo7FAP6GtQOMPC6NQsWOXzjhiSGBNuBhx/L89vfZxEmaF/z6WsTfOCyKPmcJlCa79/dzRtvFMES9KmULPlmiuF1JugQSLjjO52kuzX4muGjTD5/TYLubs2gWoOKcsmVV0TpV2tQN8TANAQdnYpsXjFjus3mbR4RR9AD2eWyigljLerqDJ59vki/vpL+fQ3+/ECOXDakz0kj1LiN2zzKBxgM6GfQ3a2pqTH44r8m6GxX/PkvOYISuyLdqQkUSAFHj/rQeRhjyaemLXnxyX00tRhEHDhwMODDV0a54vIoU8ZbXHRhhGkTbf729zyZrOaM8TZz5zkYQoAP/YaZTJ1gs2mLR6Bg+y6fxoaAqVNsLEMwYYZNVVywdbsfetgVLhVlkmHDLZyoYMH8CI2NAS2tirZOxeo1LuPGWpT3M8inFY8/W+DiC6JIA264OY3yNHNmOHRnwzLn4caAuqEmzzxf4ILzIryytMis6TZTp9ssOtPhuReLPPVcgcoKycc/FmfOHId8QfHy6y6WDa4LyaRk5pkOe3d47D8YEASav/89z+ZtHoMHhWDHjKk2lRWStnZF0YVELGDhgj6YflcHLW0hbGMYYYhyx13dzJ5pM2q0SaZB88IrBbqzCgHU9pVgwi9/laGlPcCQISIcjQhaA015mWDlWpfmb3dS3UfieZCIhe/J5jSxmOCXv8uyfKWLbYaxVRCEWhOPClraFHf+oJvhI0wyXYqKCsmbq4u8vrxIdZVk9TqPw0cCiq7GcyGTVRw47NPaofn+T7rpziju+V2GVJmkpUXReCSgulrylwdzbNrqUV0l2bzdw7RCL2ua0NAQgKep7W/i+QViMcmsGTYaOGOsxahhJhXlktasps9LBR54uEBHBxTSacxCd5FcTvRG8ZYVfn9tWZFXXi+Sz2vKK8JqWD6n6dvPIMjD2o0uHWmNZYUCsCyBbYdQUCIhaDwWcLAh9IpKQTQSJu35vGbGFIv9BwPa0gqzBBZEIiEsH40K8gXN2rVuWON1BA2NAUKE13e9MKSSIlyzaULjkYBJEyy2bvcREg41BPgHwly6pwYciQg2bfMISpCVUbqvaQiyeUXQrakdIIk4gnRac+n5UcwSGvXnh/Ls3OXR2RWak0RcUHAl2a4MZi7bTaAFnMQUBUgmw5jvzDk2u/f5dGdCYfWplnSlQ3ZAKil6jfbJdYqe6N1xTs1F83nN0MEmZ4yzCHzo6AwpGGYJruphchlG+OA9qZhti1Mxvkgp+yiG10zEBCPrQy15dVmRWEz0rqengK51iFSfvFatw3t1dWu6uhVVZRKjRNZ64OEca9Z7ZHIhZOc4oQIcbgw3xg8EuUwO6eZzBEr2EjalPJFLFosa0xJ88P1RPE8jBcQigkJOUyyEtZMeb/dfIaeexfd8BQHEopLhdQabtnhceXmUyy6IMmmCje+FgjiZ4qtLIUV3tz7l+kKErNSubk3fasniMyNcd00CpaErrRk5zCSX06ds6Mkssf+6ViHALWjy2XBjIESy16wPj3lVpSSZEFgl/rZt92QngmIhj6mV35uAex54nj5RQxbwwssF+veLkUgIMt0hr9n39T/EjpUy3OVPXBVl+KgQSNi8ycOQcM1HYuhrBOtXuzz0WJ5iUWOYIVdmzAiLAQMky1e4Ie9ahGucPcPmogujDKiSrN/ksWady1nnONQONKiukHz33zMhP/DdrlGAUhrDFr2PZVolplhwQqly+ZBvE8L9gsArYPbsgu8TAqidqvdDoqds6IS2jdKR+kcAJlF66Nr+kkkTLIaMsOhqCThrsUF5leSX92TIFBSV5QaOA/lCyCNMJQVfuT5Bqs7E+EkXzzxfJJUSyJLVWL60yOFGn09cHWf+XIdjTQFjRlsUC5oZUy1eXRoeZfUPsNV0L3E9rBsVC/SCrYViyPKaPdXh70/lMUyQ0sQ0bKeXQzd1ssXkqTa5zpBG6/saOyY4diTA88IddV1NLCrftRDDXdSMHWNTUSVROcWufT7ZnGJIrcGggQZjJkX4+yN5WloV8Xi4WYWi5nirIl6haGlRIY+wpC1btvtce02MYXUmBw4HuAHs2ecRizjEywRnTLBYtdZDvUs0VgiBaQk8T6O1RkrBWfMdVq8LbeCIeotLLogweZrNutVhjl5eBqbtYEaicSTNOE6YvvzlbznyRV1iLYUqXF9nEouGlbnOrKamRhKLC3yPd4TclQohpZHDTCJWKPb+fSWdnVA31iYal9z/YI7du/3ekMYyId2laW4JGDbU4ODhAMs64RiKruaZZ4pcdlGEaWc6HN/vM7C/EToXBbX9DPr3lRw45BOJnEYLBagAYglBIiloOqbQArwiLJzn8P7LY7ieJmIKXny1wMO3dOL5YSgmRIATjWJGE0kMqTCMsNDSE5OdrEE7dntEI2HxqLlJMWmiIBGXtLYrbOP0ti+f10yZZDFpglXKUzX9+hj062PwwJ+zPPxYHilDelpVmUFXRlF0dW9cighDK6VC51GWlPhKs2ufx213uUx+yuLGzycZNdLCLlF5Bw4wmDPTpqExOO0RFoCnoCIqSCQlzVs9iq6muq/Bsy8W2brNo6xCMmqEyc5dHrv3+vTpYxAogSU18WQc00lGKS+D1k5KIcV/a//AKYURQkDT8QCigooySXNLgDip5BiUmKNGKaYMfEgmJOcsjlBRbqCDEM0xHMHuXT4NjQE/+EEZcSlIJQSxpOTQQZ8f/jxD47HgxEaK0LlddWWUSy+JEhQ06W5NztNsXO/x9ydyfObTCTpaFGVJgQTmz3HYtNVjy/Ywxeu5Tg8nuwexDgJNRbmEuOBIYwBaUHAVy1cWKRQ1x1oCdu/1OGOcxZevT7Bnb8CDTxQYUK2JlSWQMlVDVYXAD05A4L1fnOgg0joUbk9wPKzewPdPJfwkIgKhw2xGCPB8zehRJsOHmhglIrw0BLt3e+w95DNxvMWwyTb9+hocPqZ49rk8Nf0lY0eZFAu6F40JSeqCsxY67N7lsW2nT3WFZNgEm/MXOeRysHNHSAWRpgAVOqHpU23sktlwXU0hp4lYIiSl9zhPD4bVGSDh8NEwxgv88LkjEUGsBKqsXu/xxLMFDh/xkQKqqwV2eQ0m5UPpU30CbT5dadCyBEeOBnhpxZgRFk9Q6OEjYTnwmU/GqR1i8PxzBZ59sYiUIQvKtAXdGUXUETg29B9o8OBjeWZMstm63OX++7NhdiFDeOt4a1jhc70TMaDnwV0/6iabC+s1tf1MLjovwqQJFvsP+HR0WcyYZKM8jRdolBKMHWHSp1pyuCFg6BCTq6+K0bda8sc/Z9m81cOKC4SE0SNNdEZz6HDQK9z/mhyUlwkONgQYUmNZksoUUDEESayW+qEOAn1aZ9CT5rV3KPbu8ZkwziSVDMlFhgm5HKze4BK3BJ+4LsGs6Ra2LZgyyWbLNpf1W1x8rRFSUF1pcP1nE3TnND/6YRcbNof1h1hMcPBw0BtGVZVJZCI83hpN47GAru6w3HD4iM8vfpvh3geyfPSqGLOnORgCpAlHmgNeeDVPslwyeoSJaQq+8aUEU6bb7D/kc7gxdEqeB+UpwfgxFof2+RxvDbDtt3aKoTMMHaJSmiF1UUgORhKpY+DQCiJOgNLinUMSBavWucT6G4waYVEo6DCPRpMvaHQQYnpzp9sIDZYd8vyOHVesXOeye7/HkYaAmkqDj1wd44ffKeOr/5pk2BCTzs6QIdCd0Sye51BfZ3JwT8Anro4T+GFe7PuhbXnfxVG+f2cZX74+yYw5DumOgMNHA7bs9Fi70aV/jUlFTdgCMX60SZ9agyCtKOYVhYIO8/KCZvQIi3itweoNLkX31MrfWylRoAWWETC0vgKcIUhEObX1g6ipCPC80x9jpcLCyrqNHkFGs3ie3dtWoRWUJSW2U8Lj8poRw0ziMUFZUnLxuVGiEcH2XT6vvVlg9TqX9mZFnwEGZ18S4c7by7jo3AjdGU1ZUvCJj8d57qUC376rkzETbM5d5NDapulbY3DrTUmu/VyCCdNtTAkH9vi8+GqRFWtdjjUp5k53mDHZBlczdpSFaQElrU4mJGapMQcNC+bYkNesWefh2KdvE+lJOKrKfYaMHAyUYSrAGjSOEXVv0nBc4Nhvf5RDypfgyLGADatdps12GPhInuOtCtsMNc2xJULBirUeiWQIYSUigrgNM0t14vY2xR3f7aKtUzFutMX5ZzmMGmFy7ecSbNricc7iEF5/9Kk8rW2KRx/K8YmPxVn6pssXro0zfIzF0T0+ry8vsma9S8MRxXUfj3Hm4ghWyVkFribwQuez/1BA85GAmgEG9UNM+veRbN/jM3SQwbTZDts2eBw47J/C3n87ARZdQf0oRWzouDC9BKBqEpMmRkGrd5U/SglPv1jAiAsuPMch3aEYO9Jk2FATGYHd2z227fC44OxILwISaPBymsDVJBICVWIJrF7v8rNfZ1i1zuXgTo9Rw0wuuSjCvX/O0p3R9OkjefjJPK6rueryKC0tigN7Pf701yz3P5SjuUURKE2iTGDZUMxpfPdEvjlhokXfKoNHn84jnLCePXOaje/C+WdHMJKCp18qvCv+jRCgAsWkM2JQPak3PwdnJGdMG0pVmY/nidMmu0qFUNOWHR7bV7qcfV6UsaNM6uoN4omwb+DvTxY4a4HDyEk2wqe3MKQ1GGWSNetdjh4NcCJQlhK4Ptz3txx3fKeL6dNsNm3yeOzZQm+/cFu74qe/yDBvrsNTLxT47o8ybNvhU10lsaww7nx1qQsihJx6lEAKSCUkn/5EjDXrPdqOBJi2YNAgg3GjTRbNczi4yWP9RvedtY8QwkrFPSbPHArOCIQGKXSAwiQ1ZgYTxyjyRcG7IYQKAX/9ew7TgknjLfr2M0L6Q1bRcNRn1nQbndeok2JyacLRAz5/eyQfQmfiBBrdt4/BokUOQ0eYbNvhc9ZCh/lzHebOcrjg3AhORNCaVlx+aYTagQbxeOhFtQq998o1LstfKfy3vjs/qxkyzKS8XLB7r48ZFVRWSPr3l2QyikeezON5PZp0mueVUCgIxo1Q9DljBhoTQYDZe8eaM1kw71FeW118x8ZPpUJwcst2jxWvF0kkJEqH2YKTlEweZ7N9h8/wEim9Jyg3JBgaFi1weO7FAm3tqpeX9/UbE1RUGXS3KT70/mjICdSnqkAuoxjU12DGwgg//1E3ry8vIiKCfF4zd5ZNLBXOVDDECfBVWnDkUEDEEQwdaqLyGiUgGZcsX+Wyep1LPBF+7h0QL5RSnDk/Cf0XltiBotTmUOpIUhtv45Yb32BfQ8gPfCeD6vlhTHbtv8R5+dUi553tMHmqDaZg+waX2v4G0bjAPKnl1DCAqKCtWXHf/VlWrnUxDMHwupCXIvVJoKc4SX1FaaSJDXt2+TzzfAHP1yQTkms+Gmf2bDt0HoUQ+BWGwHNDjG/rVpdh9SbxGoPOYwEPP5FHaNi83aOpOXhHBmw4+ELQv7LI938xH2vaHaDDUQNmzwoVAmP4RZy/aDU/+QPEou9MWnRswfHjiteWFrn0wggvvl5g7wEfQ8D4sRY79nh0ZxW1/Q36VBqUJyWGGXYnVaUkN34lye9+m+XJZ/N0d2mmT7BOr/k+yHLJkYaA9rRiyCCD229KUTPIQGc1wjgxKqCtM6DpeEAuq6mvM1m/ySOTKXKkSVFeJjhwKKDxSPCOtq93NkMRzl5oYY+5uDSfJtxVs+eAG2h0fBpzzhvPE89voPG4fdqQpqctP5USLFvpMnSIyUXvi/HHX2cYOdIkUSbpymi6u2Bjq0dlRcCwOhMD0AL6VBikogZDBhoEQZhn95B6Tnc/29P4XvjvqipJTT8Dt1PT0h6EubmElnbF3v0eWgtSKUFgAAa8srTIhedGyGQ1K1a7JJPvLLye0KW2j8uiiyej41NL7NQwgDFPbSw0sMZ+gCsu3MqPfgfRyDtP1wiCME988O853ILmhusT9BlggqsZUG8yTcG9v8/w4CN5kinJuYsdpky0icUFblbxwqthf7Hra3ylw1TpbVDvHgTFzYdNhXv3+mzY5DF5uk00qzicDnjy6QLHmgISccHNX05SUWdBl6J+kMmsqTZL3yzyyBOF/9bTfHpIDi670iQ2+YMoJJITFAh5spuRWqGSM5h96SwmjnLJlMqd73SDXE4ze6bN1dfG6VMu8TOKdFqx6rUCd97RyYuvFGnv0CyYY3PRxVH6DzQwHcF//CnL/oMheTGbV2FztTzN+IJSkNydC98nJPz+j1mON/pUDjSYNMXmIx+Ikctr9h8MuP2ubp5/MMexYwFBUUMAZ10U5YufjeMW37lmIiXkCpJRdUUWf2A2Kj79v/XNybdapRz5MT52VQpT6pAq8Q620LTgWJOi42iAHwkHPzz6RJ4uDzrTipY2xcc+HOOKD8Qodig2rHNZcmcXLy4tkkyEm9Tertm1xwfnrY9Vjxf3MpptO8P2M8sStKUDbvl2Fy88U6DjaMCwkSZLvpHCiYTIT7Rcsnq1y71/y4UXyoWoy7uddqICxcc+nMQc9/GS3z3dzIQeLXTqqT/vA1x+rkdXVp6oR7yNACNOGGP96S85zKSAANrSinPOj/DDuyu44CyHVEqAI7Cigkcfz7N6nUtFuewVlmnCk88V0D69TS4nv3wPjJTg9TeKHG4MSsBCmKplC5qf/ypDe1qBATVVkikTLH5wVzlnnhehrUNx6GCA1UeydYvH/Q/lTg/1l2YtdHZLLlzgMu7yj6CsurdsOJRvZWikVqi+V/L+ayYxbphLd06e9igHAVRUCJatKLL6hQKz5tmsXe/yqavb2bfH44abUxw6FPD8I3lkTHDVB2NUVUpaW4NezC0aFezY7fPX/8xilgksW/QOfhNApEpyYJfPXx7MEY2GdrLHfHSmNe+7KMqwsRYNBwL+474cV14Ro6ld8bXPdfC7e7MsPNPBzSj+8Ods74yudzq69bVFPvKZKah+7/8HujV7DI00MSpHMCa5lGVvuvj+6W8afkpw4GDARedHWXimg+fCf/wpSyGj+dBVcXZv99iz02fuhVEWTraxbDjSpHDdcMcjEcGWHT4dxxUDBxkkkhLDFBQ8WLmiyD2/zVIohsXtIAhz6XGjLT750TiXXBmjqSHgqSfynH9RhJ27fb73/S6qqiVf/mKSuQsjPP1YnpeXupQl3z5wDttoBUIrbv5KGX3OuRWMyrdsNDx9x3pPz3D6Fdb+/vt875cGsag6panvrW2G5ivXJ6kdauLmFPf8LsvWbR7Dh5l8+IoomzZ7zJ3tEC+TZLsC/vZInr37fPwgJIWbRojTpRKSgYMMIhFoalIcOxpgWiecWjwhiEcF77skwpQzbFwBr75QQAMHDges2+BRWSm57toYY0ZZ+Bp+fk+GbTu9MOVUb6993RnJDZ/yOfOLN6PKFp12dsI7zEwodW8evY9nfvYnfvtAhPKkOm3a08Ny8H1wItC3xmDv3lBAlhlW35IpyeyZNjEzzEvHjzPZeyBg7z6flvaA9rSmo03hFjVKhyhwVY2kqlzQp8pgWJ3JqNEmLc2KtRtd8jnN1t0eR44ogkCXKCohkz9VivUsM6QKn3aEiQHtacm/vK/AB771KYJ+H8HQAQjjfze1QyGRB37C3370BA88FaUiFZYLT/dBWZpJcO2/xElVSh5/IsehwwGmKTCNEAAYMSwkGg0bajJwoIFVLkOrrEr418mt6ga9v/M7FY0NAXsO+Gzd4bFnn99byIKwfjJ6hMmgWoNlK12yWdXbDnE64XWkDS47K8cnb30fatiX3oOpHb3DJyDQCmPvD7n/7hd48Nko5angLQk8J9uSQkHz/dvLWLvJZc8+n3FjLB55It9LJHLdsCM9GpGUl4WDefrUGPSpFMSjEruU2bke5Irh2JOW5oD2TkVHR1hCMEuDG1035DwbUjBpgoXvaUaNsJg+xWLJ97rx3oYr09Og0542uHRRjk996zzUyJuQiHc1Is98V8wbNIY0UMO/ytVflTjOc9z/RIRETL1lyGEY0NmlOXehw6BBBjd/O48GKsolETvkNKNh01aP1vawRtHUrDlyLEBtDUlH0jiRKfRQzkTp2r4fFriqK8M5WqmkYOZsh8aDPus2eixe6HDPrzM8/nSB//xjJRefH+G+v2WpKJenZFayBPikOyVXnpfjYzddgBrxZaSQJxCM92RykejxsRJVMZdx43L0YSurN4RVets6lX7m+yFl4mv/muSF14rMnWlTX2dy719zfPqaON3diudfKnLdtQna0gGL5jgMGmJQFpcM6C+xbBny+eIhL0+VgItIRCCFYPRIi/IyyZFjAYmEZNJ4i3Ra8ZmPx2k6rojHBJddEsN3NSNGmAgFb67xekcC9Gyy5wuKRcEnP+Txga9+AFX/JSTyHxrO+O5nZ5VUQAgIymYwbFycMeWb2LLNpz1tEI3oE7zAAD5+dZzKSsnNt3dhlmZhNbcopk22WbzY4cWXi7SnA8qTkmwejhwLuOVrKY63KMaPt4gYgl17wyEWU8+wGTLYZM8+n/PPidDZqbj4gghlyXBSZXmZ5JHHCxxtCrj6gzHu+W2WgYMMPD/sBvUVbN1+onHRMMKOo1Q04IbrTBZ+7jrUgH8Jg+J/cLLlPyBATkqgNUFiHP1GD2fu8O00H+lg38Gw+mUYoccbPtwkm9XkchrX03RlNKmUZPM2j7GjbK7+UIy/PZSnsUmxZ7+PAcyeafOz32TZs8tDA11ZhTQEl14QpbJc0nAk4H0XRrnnN1mONimuuTrOtp0eU6fYbNvp0dGhGFYf9ow8/mSBhoaAWdMcXllWxC/xoYNA0NUtmDKmyNe/0Z8R7/86QflZGL0O4x/rDv0fDGAMyXOGDlDJGVScfTdf/95ZfP4an4gV0J2R+AHcd3+WRx4vMH2qzVmLIhQLMH+2TVlS8pWb0xxtCpg9yyGbDanDg4cYIZylwAvgUGNANCJId2jWbfSwTUF7u2LwIIPLL4sycIBBRUVYIRwy0GDWZJumJsX+wyHDIRYTTDrDYvU6l7YOhWNDV7fEFAGfvjrg1h+fS80FP0YlppdClf/ZLEqT/+lLGEit0FYfGPVNzrlxJlNm3Md//q2BpSttLNsk3al45PF877DYbFazYK5DwQuJ4Hv2hHYpk9X0qzZo7wqZWQlb9JLdLQuE1ERjgnSn5jd/zDJqpEVLc0Brq6K5WfHQ43k+/ck4w8ZYtB73OXAwIJEQ7C4F6Eob5HIBC2bk+fDVg+m78OPossWhBml12jjvfz+97V3xOksTfP12OPYoe195lkcfa2f9VgsvCO2jZYUCrB9iUlNrcPRwwOHG0MZlusOxoG5R8527u6mpkb30jkxWc8Y4iysui3L7nV2YFuRz8OlPxNi5y2fNBhchYXCtwcCBJpu2hBQ9pQX5vMAyAyaOdnnfZVWMOfcCqL0cZVS+Z5N837s50ifPkHYPQeNT7F2+lBdfOM6aTSbtXWbIttdhwcO0QripUAhbv2afaRMXgqdeKHC8VfXS7FwXFs63OfvsCPf9OcvBQwHz59o0NCq2l9qvehn7BTBNie9ryhIeU8cHnHNeDaMXLoBBF6Oswe/5LOn3eJL5f5li7h2F4y/TsfkNVr9xkFVri+xrMMnkzbCeYIJlhp8pFDS2HTbk9NCJe9LCVEJSdDWyREUO/DBvtiyB64lwIKPWJGIeQ2t9Zkx1mDl/KNWT5kO/s9BG/9JU9fd+mvk/Z5Z+iXhyYhx8HrKb4Ogqjm3fzLZNx9i5I8/+w5q2tEkmJxDSQKmQ+WQY4pSWfb80iVcpEFIghUYQEI9qKlM+dYNh9JgoEyYNYMC4M6B2JiQmooiesHM9Mdh7/BL/3L/m8BZ/kIA8FPdDx3ZU0z6ONxyiuTFNS3M3R48V6eoU5F1N0dW9RXdDhh3zEUuQTGr6D3CoqUnSd1A5NYOGYPQbBpVjwalHE/0/+0ME/wcCPFWQQK8wT8RQLqg2KBwDPw35Lsh3gpcDPxe+y7TBSkC0DKIpsMoh0h9EFWD3sh96hdabPYl/+pP9f+AQX3AhA3eqAAAAAElFTkSuQmCC”;

// ============================================================
// SEED DATA
// ============================================================
const AppContext = createContext(null);

const SEED_OPPORTUNITIES = [
{ id: 1, organization: “Connections for the Homeless”, description: “Help serve meals and sort donated clothing at the shelter. Students will interact directly with guests.”, date: “2026-03-08”, time: “9:00 AM – 12:00 PM”, location: “Evanston, IL”, spots: 12, spotsLeft: 5, type: “ISL”, category: “Hunger & Homelessness”, signups: [“alex.johnson@loy.org”,“maria.garcia@loy.org”], approved: [“alex.johnson@loy.org”], pending: [“maria.garcia@loy.org”], cancelled: false },
{ id: 2, organization: “Misericordia Heart of Mercy”, description: “Spend meaningful time with adults with developmental disabilities through arts & crafts and music.”, date: “2026-03-15”, time: “1:00 PM – 4:00 PM”, location: “Chicago, IL”, spots: 8, spotsLeft: 3, type: “Arrupe”, category: “Disability Services”, signups: [“james.kim@loy.org”], approved: [“james.kim@loy.org”], pending: [], cancelled: false },
{ id: 3, organization: “Northbrook Food Pantry”, description: “Stock shelves, sort donations, and assist clients in selecting food items.”, date: “2026-03-22”, time: “10:00 AM – 1:00 PM”, location: “Northbrook, IL”, spots: 15, spotsLeft: 15, type: “ISL”, category: “Hunger & Homelessness”, signups: [], approved: [], pending: [], cancelled: false },
{ id: 4, organization: “Wilmette Park District – Green Team”, description: “Help restore local parks by planting native species and removing invasive plants.”, date: “2026-04-05”, time: “8:00 AM – 11:00 AM”, location: “Wilmette, IL”, spots: 20, spotsLeft: 18, type: “Arrupe”, category: “Environment”, signups: [], approved: [], pending: [], cancelled: false },
{ id: 5, organization: “Peer Tutoring at ETHS”, description: “Tutor middle school students in math and reading at our partner school.”, date: “2026-04-12”, time: “3:30 PM – 5:30 PM”, location: “Evanston, IL”, spots: 10, spotsLeft: 7, type: “ISL”, category: “Education”, signups: [], approved: [], pending: [], cancelled: false },
{ id: 6, organization: “Sarah’s Inn”, description: “Sort donations and prepare care packages for survivors of domestic violence and their children.”, date: “2026-04-19”, time: “9:00 AM – 12:00 PM”, location: “Oak Park, IL”, spots: 6, spotsLeft: 6, type: “Arrupe”, category: “Family Services”, signups: [], approved: [], pending: [], cancelled: false },
{ id: 7, organization: “Cradles to Crayons”, description: “Package essential items like clothing, school supplies, and toys for children in need.”, date: “2026-05-03”, time: “10:00 AM – 1:00 PM”, location: “Chicago, IL”, spots: 25, spotsLeft: 22, type: “ISL”, category: “Children & Youth”, signups: [], approved: [], pending: [], cancelled: false },
];

const DEMO_STUDENTS = [
{ email: “alex.johnson@loy.org”, name: “Alex Johnson”, grade: “Junior (11)”, password: “student123”, savedOrgs: [“Connections for the Homeless”, “Misericordia Heart of Mercy”, “National Honor Society”] },
{ email: “maria.garcia@loy.org”, name: “Maria Garcia”, grade: “Senior (12)”, password: “student123”, savedOrgs: [“Sarah’s Inn”, “NHS - Service Committee”] },
{ email: “james.kim@loy.org”, name: “James Kim”, grade: “Sophomore (10)”, password: “student123”, savedOrgs: [“Misericordia Heart of Mercy”, “Honors Humanities Program”] },
];

// Teachers — can create classes, review hours
const TEACHER_ACCOUNTS = [
{ username: “mrsmith”, password: “teacher123”, name: “Mr. Smith”, role: “ISL Coordinator”,
classes: [
{ name: “ISL Period 2”, requirement: 40 },
{ name: “ISL Period 4”, requirement: 40 },
],
groups: []
},
{ username: “mslopez”, password: “teacher123”, name: “Ms. Lopez”, role: “Campus Ministry Director”,
classes: [{ name: “Service Leadership”, requirement: 20 }],
groups: [
{ name: “NHS - Service Committee”, requirement: 15 },
{ name: “Campus Ministry Team”, requirement: 10 },
]
},
{ username: “mrjones”, password: “teacher123”, name: “Mr. Jones”, role: “Arrupe Moderator”,
classes: [{ name: “Arrupe Program”, requirement: 30 }],
groups: [
{ name: “National Honor Society”, requirement: 20 },
{ name: “Honors Humanities Program”, requirement: 10 },
]
},
];

// Admin (super-admin) accounts
const ADMIN_ACCOUNTS = [
{ username: “admin”, password: “admin123”, name: “Administrator”, role: “Site Administrator” },
];

// Seed hour log entries
const SEED_HOUR_LOGS = [
{ id: 1, studentEmail: “alex.johnson@loy.org”, studentName: “Alex Johnson”, organization: “Connections for the Homeless”, category: “ISL”, date: “2026-02-10”, hours: 3, supervisorName: “Janet Rowe”, supervisorEmail: “jrowe@cfthecity.org”, reflection: “It was humbling to serve alongside people experiencing homelessness. I learned so much about systemic poverty.”, status: “approved”, reviewedBy: “mrsmith”, reviewNote: “Excellent reflection. Hours confirmed.”, submittedAt: “2026-02-11” },
{ id: 2, studentEmail: “alex.johnson@loy.org”, studentName: “Alex Johnson”, organization: “Misericordia Heart of Mercy”, category: “Arrupe”, date: “2026-02-17”, hours: 3, supervisorName: “Sr. Kathleen”, supervisorEmail: “skathleen@misericordia.org”, reflection: “Working with the residents changed my perspective on disability and community.”, status: “pending”, reviewedBy: null, reviewNote: “”, submittedAt: “2026-02-18” },
{ id: 3, studentEmail: “james.kim@loy.org”, studentName: “James Kim”, organization: “Misericordia Heart of Mercy”, category: “Arrupe”, date: “2026-02-15”, hours: 3, supervisorName: “Sr. Kathleen”, supervisorEmail: “skathleen@misericordia.org”, reflection: “An eye-opening experience working with the Misericordia community.”, status: “approved”, reviewedBy: “mslopez”, reviewNote: “Approved.”, submittedAt: “2026-02-16” },
];

// ============================================================
// UTILITIES
// ============================================================
const formatDate = (d) => { if (!d) return “”; const dt = new Date(d + “T12:00:00”); return dt.toLocaleDateString(“en-US”, { weekday: “long”, year: “numeric”, month: “long”, day: “numeric” }); };
const shortDate = (d) => { if (!d) return “”; const dt = new Date(d + “T12:00:00”); return dt.toLocaleDateString(“en-US”, { month: “short”, day: “numeric”, year: “numeric” }); };
const daysUntil = (d) => Math.ceil((new Date(d + “T12:00:00”) - new Date()) / 864e5);
const typeBadgeStyle = (type) => ({ background: type === “ISL” ? “#5C1830” : “#C4973A”, color: type === “ISL” ? “white” : “#2E1A00”, padding: “3px 10px”, borderRadius: “20px”, fontSize: “11px”, fontWeight: “700”, letterSpacing: “0.5px”, textTransform: “uppercase”, display: “inline-block” });
const statusBadge = (status) => {
const map = { approved: { bg: “#E6F4EC”, color: “#1E6B3C”, border: “#A8DDB8”, label: “Approved” }, pending: { bg: “#FFF8E1”, color: “#7A5200”, border: “#D4B030”, label: “Pending” }, denied: { bg: “#FDECEA”, color: “#8B1A1A”, border: “#F5AEAE”, label: “Denied” } };
const s = map[status] || map.pending;
return { style: { background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: “4px 12px”, borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: “nowrap” }, label: s.label };
};

const SERVICE_CATEGORIES = [“ISL”, “Arrupe”, “Campus Ministry”, “Honors Program”, “NHS”, “Independent Service”, “Other”];

// ============================================================
// GLOBAL CSS
// ============================================================
const GLOBAL_CSS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } :root { --maroon: #5C1830; --maroon-dark: #3A0E20; --maroon-mid: #6E2038; --gold: #C4973A; --gold-light: #D4A84C; --gold-pale: #FAF0D8; --cream: #FAF8F4; --gray-50: #F7F7F7; --gray-100: #EEEEEE; --gray-200: #DDDDDD; --gray-400: #AAAAAA; --gray-500: #888888; --gray-600: #555555; --gray-700: #444444; --gray-800: #2A2A2A; --success: #1E6B3C; --success-bg: #E6F4EC; --warn: #7A5200; --warn-bg: #FFF8E1; --error: #8B1A1A; --error-bg: #FDECEA; --shadow-sm: 0 1px 4px rgba(0,0,0,0.08); --shadow-md: 0 4px 16px rgba(0,0,0,0.10); --shadow-lg: 0 8px 32px rgba(0,0,0,0.14); --radius: 10px; --radius-lg: 16px; } body { font-family: 'Source Sans 3', sans-serif; background: var(--cream); color: var(--gray-800); } button { cursor: pointer; font-family: 'Source Sans 3', sans-serif; } input, select, textarea { font-family: 'Source Sans 3', sans-serif; font-size: 14px; border: 1.5px solid var(--gray-200); border-radius: 8px; padding: 10px 14px; width: 100%; outline: none; background: white; transition: border-color 0.2s; } input:focus, select:focus, textarea:focus { border-color: var(--maroon); outline: 2px solid rgba(92,24,48,0.12); } label { font-size: 13px; font-weight: 600; color: var(--gray-600); display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; } .form-group { margin-bottom: 18px; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: var(--gray-200); border-radius: 3px; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } } .fade-in { animation: fadeIn 0.35s ease both; } .slide-in { animation: slideIn 0.3s ease both; } @media (max-width: 640px) { .hide-mobile { display: none !important; } .mobile-full { width: 100% !important; } }`;

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
useEffect(() => {
const style = document.createElement(“style”);
style.textContent = GLOBAL_CSS;
document.head.appendChild(style);
return () => document.head.removeChild(style);
}, []);

const [currentUser, setCurrentUser] = useState(null);
const [userType, setUserType] = useState(null); // “student” | “teacher” | “admin”
const [page, setPage] = useState(“landing”);
const [opportunities, setOpportunities] = useState(SEED_OPPORTUNITIES);
const [hourLogs, setHourLogs] = useState(SEED_HOUR_LOGS);
const [students, setStudents] = useState(DEMO_STUDENTS);
const [teachers, setTeachers] = useState(TEACHER_ACCOUNTS);
const [notifications, setNotifications] = useState({
“alex.johnson@loy.org”: [
{ id: 1, message: “Your hours at Connections for the Homeless were approved by Mr. Smith.”, read: false, date: “2026-02-12”, type: “success” },
{ id: 2, message: “Reminder: You have upcoming service at Connections for the Homeless on March 8.”, read: false, date: “2026-02-23”, type: “reminder” },
],
“maria.garcia@loy.org”: [{ id: 1, message: “Your signup for Connections for the Homeless is pending approval.”, read: false, date: “2026-02-22”, type: “info” }],
“james.kim@loy.org”: [{ id: 1, message: “Your hours at Misericordia Heart of Mercy were approved by Ms. Lopez.”, read: false, date: “2026-02-17”, type: “success” }],
});
const [toast, setToast] = useState(null);

const showToast = (msg, type = “success”) => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
const addNotification = (email, message, type = “info”) => setNotifications(prev => ({ …prev, [email]: […(prev[email] || []), { id: Date.now(), message, type, read: false, date: new Date().toISOString().split(“T”)[0] }] }));
const logout = () => { setCurrentUser(null); setUserType(null); setPage(“landing”); };

const unreadCount = currentUser && userType === “student” ? (notifications[currentUser.email] || []).filter(n => !n.read).length : 0;

const ctx = {
currentUser, setCurrentUser, userType, setUserType, page, setPage,
opportunities, setOpportunities, hourLogs, setHourLogs,
students, setStudents, teachers, setTeachers,
notifications, setNotifications, addNotification,
showToast, logout, unreadCount,
DEMO_STUDENTS, TEACHER_ACCOUNTS, ADMIN_ACCOUNTS, teachers, setTeachers,
};

return (
<AppContext.Provider value={ctx}>
<div style={{ minHeight: “100vh”, display: “flex”, flexDirection: “column” }}>
<Header />
<main style={{ flex: 1 }}>
{page === “landing” && <LandingPage />}
{page === “student-login” && <StudentLogin />}
{page === “teacher-login” && <TeacherLogin />}
{page === “admin-login” && <AdminLogin />}
{page === “student-dashboard” && userType === “student” && <StudentDashboard />}
{page === “browse” && userType === “student” && <BrowseOpportunities />}
{page === “my-service” && userType === “student” && <MyService />}
{page === “log-hours” && userType === “student” && <LogHours />}
{page === “notifications-page” && userType === “student” && <NotificationsPage />}
{page === “teacher-dashboard” && userType === “teacher” && <TeacherDashboard />}
{page === “admin-dashboard” && userType === “admin” && <AdminDashboard />}
{page === “admin-opportunities” && userType === “admin” && <AdminOpportunities />}
{page === “admin-post” && userType === “admin” && <AdminPostOpportunity />}
</main>
{toast && <Toast msg={toast.msg} type={toast.type} />}
</div>
</AppContext.Provider>
);
}

// ============================================================
// HEADER
// ============================================================
function Header() {
const { currentUser, userType, page, setPage, logout, unreadCount } = useContext(AppContext);
const nav = (active) => ({ background: active ? “var(–gold)” : “transparent”, color: active ? “var(–maroon-dark)” : “rgba(255,255,255,0.88)”, border: `1px solid ${active ? "var(--gold)" : "rgba(255,255,255,0.25)"}`, padding: “6px 14px”, borderRadius: “7px”, fontSize: “13px”, fontWeight: active ? “700” : “500”, cursor: “pointer”, transition: “all 0.18s”, fontFamily: “‘Source Sans 3’, sans-serif” });
return (
<header style={{ background: “var(–maroon)”, color: “white”, padding: “0 1.5rem”, height: 64, display: “flex”, alignItems: “center”, justifyContent: “space-between”, boxShadow: “0 2px 16px rgba(0,0,0,0.22)”, position: “sticky”, top: 0, zIndex: 200 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, cursor: “pointer” }} onClick={() => currentUser ? setPage(userType === “teacher” ? “teacher-dashboard” : userType === “admin” ? “admin-dashboard” : “student-dashboard”) : setPage(“landing”)}>
<div style={{ width: 52, height: 52, borderRadius: “50%”, flexShrink: 0, overflow: “hidden”, boxShadow: “0 0 0 2px var(–gold)”, background: “#fff” }}>
<img src={`data:image/png;base64,${LOGO_B64}`} alt=“Loyola Academy” style={{ width: “100%”, height: “100%”, objectFit: “cover” }} />
</div>
<div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 15, fontWeight: 700, color: “var(–gold)”, lineHeight: 1.2 }}>Loyola Academy</div>
<div style={{ fontSize: 11, color: “rgba(255,255,255,0.7)”, letterSpacing: “1.2px”, textTransform: “uppercase” }}>Service Portal</div>
</div>
</div>
<nav style={{ display: “flex”, alignItems: “center”, gap: 8, flexWrap: “wrap” }}>
{userType === “student” && (<>
<button style={nav(page === “student-dashboard”)} onClick={() => setPage(“student-dashboard”)}>Dashboard</button>
<button style={nav(page === “browse”)} onClick={() => setPage(“browse”)}>Browse</button>
<button style={nav(page === “my-service”)} onClick={() => setPage(“my-service”)}>My Service</button>
<button style={{ …nav(page === “log-hours”), background: page === “log-hours” ? “var(–gold)” : “rgba(255,255,255,0.12)”, borderColor: “rgba(255,255,255,0.3)” }} onClick={() => setPage(“log-hours”)}>Log Hours</button>
<button onClick={() => setPage(“notifications-page”)} style={{ position: “relative”, background: page === “notifications-page” ? “rgba(255,255,255,0.15)” : “transparent”, border: “1px solid rgba(255,255,255,0.25)”, color: “white”, padding: “6px 14px”, borderRadius: “7px”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: “13px”, fontWeight: page === “notifications-page” ? 700 : 500, cursor: “pointer”, whiteSpace: “nowrap” }}>
Notifications
{unreadCount > 0 && <span style={{ marginLeft: 6, background: “var(–gold)”, color: “var(–maroon-dark)”, minWidth: 18, height: 18, borderRadius: “50%”, fontSize: 9, fontWeight: 700, display: “inline-flex”, alignItems: “center”, justifyContent: “center”, padding: “0 4px” }}>{unreadCount}</span>}
</button>
<button style={{ …nav(false), borderColor: “rgba(255,255,255,0.4)” }} onClick={logout}>Sign Out</button>
</>)}
{userType === “teacher” && (<>
<button style={nav(page === “teacher-dashboard”)} onClick={() => setPage(“teacher-dashboard”)}>Dashboard</button>
<button style={{ …nav(false), borderColor: “rgba(255,255,255,0.4)” }} onClick={logout}>Sign Out</button>
</>)}
{userType === “admin” && (<>
<button style={nav(page === “admin-dashboard”)} onClick={() => setPage(“admin-dashboard”)}>Dashboard</button>
<button style={nav(page === “admin-opportunities”)} onClick={() => setPage(“admin-opportunities”)}>Opportunities</button>
<button style={{ …nav(false), background: “var(–gold)”, color: “var(–maroon-dark)”, border: “none”, fontWeight: 700 }} onClick={() => setPage(“admin-post”)}>+ Post New</button>
<button style={{ …nav(false), borderColor: “rgba(255,255,255,0.4)” }} onClick={logout}>Sign Out</button>
</>)}
{!currentUser && (<>
<button style={nav(false)} onClick={() => setPage(“student-login”)}>Student Login</button>
<button style={nav(false)} onClick={() => setPage(“teacher-login”)}>Teacher Login</button>
</>)}
</nav>
</header>
);
}

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage() {
const { setPage } = useContext(AppContext);
return (
<div className="fade-in">
<div style={{ background: “linear-gradient(135deg, var(–maroon-dark) 0%, var(–maroon) 60%, var(–maroon-mid) 100%)”, color: “white”, padding: “5rem 1.5rem 4rem”, textAlign: “center”, position: “relative”, overflow: “hidden” }}>
<div style={{ position: “absolute”, inset: 0, background: “radial-gradient(ellipse at 60% 40%, rgba(196,151,58,0.12) 0%, transparent 70%)” }} />
<div style={{ position: “relative”, maxWidth: 700, margin: “0 auto” }}>
<div style={{ fontSize: 12, color: “var(–gold)”, letterSpacing: “2px”, textTransform: “uppercase”, marginBottom: “1rem”, fontWeight: 600 }}>Cura Personalis · Men & Women for Others</div>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: “clamp(2rem,5vw,3.5rem)”, fontWeight: 800, lineHeight: 1.15, marginBottom: “1.25rem” }}>Loyola Academy<br /><span style={{ color: “var(–gold)” }}>Service Portal</span></h1>
<p style={{ fontSize: 18, color: “rgba(255,255,255,0.82)”, marginBottom: “2.5rem”, maxWidth: 520, margin: “0 auto 2.5rem” }}>Log your service hours, track your progress, and connect with organizations making a difference.</p>
<div style={{ display: “flex”, gap: 12, justifyContent: “center”, flexWrap: “wrap” }}>
<button onClick={() => setPage(“student-login”)} style={{ background: “var(–gold)”, color: “var(–maroon-dark)”, border: “none”, padding: “14px 32px”, borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: “pointer” }}>Student Sign In</button>
<button onClick={() => setPage(“teacher-login”)} style={{ background: “rgba(255,255,255,0.12)”, color: “white”, border: “1px solid rgba(255,255,255,0.3)”, padding: “14px 32px”, borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: “pointer” }}>Teacher Sign In</button>
</div>
</div>
</div>
<div style={{ background: “var(–gold)”, padding: “1.5rem 2rem” }}>
<div style={{ maxWidth: 900, margin: “0 auto”, display: “flex”, justifyContent: “space-around”, flexWrap: “wrap”, gap: “1rem” }}>
{[{ number: “240+”, label: “Students Served” },{ number: “40+”, label: “Partner Organizations” },{ number: “3,600+”, label: “Hours Logged” }].map(s => (
<div key={s.label} style={{ textAlign: “center” }}>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 36, fontWeight: 800, color: “var(–maroon-dark)”, lineHeight: 1 }}>{s.number}</div>
<div style={{ fontSize: 13, color: “var(–maroon)”, fontWeight: 600, textTransform: “uppercase”, letterSpacing: “0.5px”, marginTop: 4 }}>{s.label}</div>
</div>
))}
</div>
</div>
<div style={{ maxWidth: 900, margin: “3rem auto”, padding: “0 1.5rem” }}>
<div style={{ background: “var(–gold-pale)”, padding: “1.5rem”, borderRadius: “var(–radius)”, border: “1px solid #EDE0C0”, fontSize: 13, color: “var(–gray-600)”, textAlign: “center” }}>
<strong style={{ color: “var(–maroon)” }}>Demo credentials —</strong> Student: <code style={{ background: “#DDD0A0”, padding: “1px 6px”, borderRadius: 4 }}>alex.johnson@loy.org</code> / <code style={{ background: “#DDD0A0”, padding: “1px 6px”, borderRadius: 4 }}>student123</code>
{” | “} Teacher: <code style={{ background: “#DDD0A0”, padding: “1px 6px”, borderRadius: 4 }}>mrsmith</code> / <code style={{ background: “#DDD0A0”, padding: “1px 6px”, borderRadius: 4 }}>teacher123</code>
</div>
</div>
<div style={{ maxWidth: 900, margin: “0 auto 2rem”, padding: “0 1.5rem”, textAlign: “center” }}>
<button onClick={() => setPage(“admin-login”)} style={{ background: “none”, border: “none”, color: “var(–gray-400)”, fontSize: 11, cursor: “pointer”, letterSpacing: “0.5px” }}>Staff Administration</button>
</div>
</div>
);
}

// ============================================================
// STUDENT LOGIN
// ============================================================
function StudentLogin() {
const { setCurrentUser, setUserType, setPage, showToast, DEMO_STUDENTS } = useContext(AppContext);
const [email, setEmail] = useState(””); const [pass, setPass] = useState(””); const [err, setErr] = useState(””);
const handle = () => {
const s = DEMO_STUDENTS.find(s => s.email === email.trim() && s.password === pass);
if (s) { setCurrentUser(s); setUserType(“student”); setPage(“student-dashboard”); showToast(“Welcome back, “ + s.name.split(” “)[0] + “!”); }
else setErr(“Incorrect email or password.”);
};
return (
<div className=“fade-in” style={{ minHeight: “80vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: “2rem” }}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, boxShadow: “var(–shadow-lg)”, width: “100%”, maxWidth: 400, overflow: “hidden” }}>
<div style={{ background: “var(–maroon)”, padding: “1.5rem 2rem 2rem”, textAlign: “center”, position: “relative” }}>
<button onClick={() => setPage(“landing”)} style={{ position: “absolute”, left: 14, top: 14, background: “rgba(255,255,255,0.15)”, border: “1px solid rgba(255,255,255,0.3)”, color: “white”, borderRadius: 7, padding: “5px 14px”, fontSize: 12, fontWeight: 600, cursor: “pointer” }}>Back</button>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 22, fontWeight: 700, color: “var(–gold)” }}>Student Sign In</div>
<div style={{ color: “rgba(255,255,255,0.7)”, fontSize: 13, marginTop: 4 }}>Loyola Academy Service Portal</div>
</div>
<div style={{ padding: “2rem” }}>
{err && <div style={{ background: “var(–error-bg)”, color: “var(–error)”, padding: “10px 14px”, borderRadius: 8, marginBottom: 16, fontSize: 13, border: “1px solid #F5AEAE” }}>{err}</div>}
<div className="form-group"><label>Email Address</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder=“you@loy.org” type=“email” onKeyDown={e => e.key === “Enter” && handle()} /></div>
<div className="form-group"><label>Password</label><input value={pass} onChange={e => setPass(e.target.value)} type=“password” placeholder=“Password” onKeyDown={e => e.key === “Enter” && handle()} /></div>
<button onClick={handle} style={{ width: “100%”, background: “var(–maroon)”, color: “white”, border: “none”, padding: “13px”, borderRadius: 9, fontSize: 15, fontWeight: 700, marginTop: 4 }}>Sign In</button>
<div style={{ marginTop: “1.25rem”, padding: “1rem”, background: “var(–gold-pale)”, borderRadius: 8, border: “1px solid #EDE0C0” }}>
<div style={{ fontSize: 12, fontWeight: 700, color: “var(–maroon)”, marginBottom: 6, textTransform: “uppercase”, letterSpacing: “0.5px” }}>Demo Accounts</div>
{DEMO_STUDENTS.map(s => (
<button key={s.email} onClick={() => { setEmail(s.email); setPass(s.password); }} style={{ display: “block”, width: “100%”, textAlign: “left”, background: “none”, border: “none”, color: “var(–maroon)”, fontSize: 13, padding: “4px 0”, cursor: “pointer”, fontFamily: “‘Source Sans 3’, sans-serif” }}>
{s.name} ({s.grade})
</button>
))}
</div>
<div style={{ textAlign: “center”, marginTop: 16, fontSize: 13, color: “var(–gray-500)” }}>
Are you a teacher? <button onClick={() => setPage(“teacher-login”)} style={{ background: “none”, border: “none”, color: “var(–maroon)”, fontWeight: 700, cursor: “pointer”, fontSize: 13 }}>Teacher Login</button>
</div>
</div>
</div>
</div>
);
}

// ============================================================
// TEACHER LOGIN
// ============================================================
function TeacherLogin() {
const { setCurrentUser, setUserType, setPage, showToast, TEACHER_ACCOUNTS } = useContext(AppContext);
const [user, setUser] = useState(””); const [pass, setPass] = useState(””); const [err, setErr] = useState(””);
const handle = () => {
const t = TEACHER_ACCOUNTS.find(t => t.username === user.trim() && t.password === pass);
if (t) { setCurrentUser(t); setUserType(“teacher”); setPage(“teacher-dashboard”); showToast(“Welcome, “ + t.name + “.”); }
else setErr(“Incorrect username or password.”);
};
return (
<div className=“fade-in” style={{ minHeight: “80vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: “2rem” }}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, boxShadow: “var(–shadow-lg)”, width: “100%”, maxWidth: 420, overflow: “hidden” }}>
<div style={{ background: “var(–maroon-dark)”, padding: “1.5rem 2rem 2rem”, textAlign: “center”, position: “relative” }}>
<button onClick={() => setPage(“landing”)} style={{ position: “absolute”, left: 14, top: 14, background: “rgba(255,255,255,0.15)”, border: “1px solid rgba(255,255,255,0.3)”, color: “white”, borderRadius: 7, padding: “5px 14px”, fontSize: 12, fontWeight: 600, cursor: “pointer” }}>Back</button>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 22, fontWeight: 700, color: “var(–gold)” }}>Teacher Sign In</div>
<div style={{ color: “rgba(255,255,255,0.7)”, fontSize: 13, marginTop: 4 }}>ISL and Service Staff Portal</div>
</div>
<div style={{ padding: “2rem” }}>
{err && <div style={{ background: “var(–error-bg)”, color: “var(–error)”, padding: “10px 14px”, borderRadius: 8, marginBottom: 16, fontSize: 13, border: “1px solid #F5AEAE” }}>{err}</div>}
<div className="form-group"><label>Username</label><input value={user} onChange={e => setUser(e.target.value)} placeholder=“e.g. mrsmith” onKeyDown={e => e.key === “Enter” && handle()} /></div>
<div className="form-group"><label>Password</label><input value={pass} onChange={e => setPass(e.target.value)} type=“password” placeholder=“Password” onKeyDown={e => e.key === “Enter” && handle()} /></div>
<button onClick={handle} style={{ width: “100%”, background: “var(–maroon-dark)”, color: “white”, border: “none”, padding: “13px”, borderRadius: 9, fontSize: 15, fontWeight: 700 }}>Sign In</button>
<div style={{ marginTop: “1.25rem”, padding: “1rem”, background: “var(–gold-pale)”, borderRadius: 8, border: “1px solid #EDE0C0”, fontSize: 12, color: “var(–gray-600)” }}>
<strong>Demo accounts:</strong> mrsmith / teacher123 | mslopez / teacher123 | mrjones / teacher123
</div>
<div style={{ textAlign: “center”, marginTop: 16, fontSize: 13 }}>
Looking for <button onClick={() => setPage(“student-login”)} style={{ background: “none”, border: “none”, color: “var(–maroon)”, fontWeight: 700, cursor: “pointer”, fontSize: 13 }}>Student Login?</button>
</div>
</div>
</div>
</div>
);
}

// ============================================================
// ADMIN LOGIN
// ============================================================
function AdminLogin() {
const { setCurrentUser, setUserType, setPage, showToast, ADMIN_ACCOUNTS } = useContext(AppContext);
const [user, setUser] = useState(””); const [pass, setPass] = useState(””); const [err, setErr] = useState(””);
const handle = () => {
const a = ADMIN_ACCOUNTS.find(a => a.username === user.trim() && a.password === pass);
if (a) { setCurrentUser(a); setUserType(“admin”); setPage(“admin-dashboard”); showToast(“Admin access granted.”); }
else setErr(“Incorrect credentials.”);
};
return (
<div className=“fade-in” style={{ minHeight: “80vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: “2rem” }}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, boxShadow: “var(–shadow-lg)”, width: “100%”, maxWidth: 380, overflow: “hidden” }}>
<div style={{ background: “var(–maroon-dark)”, padding: “1.75rem”, textAlign: “center”, position: “relative” }}>
<button onClick={() => setPage(“landing”)} style={{ position: “absolute”, left: 14, top: 14, background: “rgba(255,255,255,0.15)”, border: “1px solid rgba(255,255,255,0.3)”, color: “white”, borderRadius: 7, padding: “5px 14px”, fontSize: 12, fontWeight: 600, cursor: “pointer” }}>Back</button>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 20, fontWeight: 700, color: “var(–gold)” }}>Staff Administration</div>
<div style={{ color: “rgba(255,255,255,0.6)”, fontSize: 12, marginTop: 4 }}>Authorized Personnel Only</div>
</div>
<div style={{ padding: “2rem” }}>
{err && <div style={{ background: “var(–error-bg)”, color: “var(–error)”, padding: “10px 14px”, borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{err}</div>}
<div className="form-group"><label>Username</label><input value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === “Enter” && handle()} /></div>
<div className="form-group"><label>Password</label><input value={pass} onChange={e => setPass(e.target.value)} type=“password” onKeyDown={e => e.key === “Enter” && handle()} /></div>
<button onClick={handle} style={{ width: “100%”, background: “var(–maroon-dark)”, color: “white”, border: “none”, padding: “13px”, borderRadius: 9, fontSize: 15, fontWeight: 700 }}>Sign In</button>
</div>
</div>
</div>
);
}

// ============================================================
// STUDENT DASHBOARD
// ============================================================
function StudentDashboard() {
const { currentUser, opportunities, hourLogs, setPage, notifications, teachers } = useContext(AppContext);
const mySignups = opportunities.filter(o => o.signups.includes(currentUser.email) && !o.cancelled);
const upcoming  = mySignups.filter(o => daysUntil(o.date) >= 0 && o.approved.includes(currentUser.email));
const myLogs    = hourLogs.filter(l => l.studentEmail === currentUser.email);
const approved  = myLogs.filter(l => l.status === “approved”);
const pending   = myLogs.filter(l => l.status === “pending”);
const totalHours  = approved.reduce((s, l) => s + l.hours, 0);
const islHours    = approved.filter(l => l.category === “ISL”).reduce((s, l) => s + l.hours, 0);
const arrupeHours = approved.filter(l => l.category === “Arrupe”).reduce((s, l) => s + l.hours, 0);

const normalizeItems = (arr) => (arr || []).map(x => typeof x === “string” ? { name: x, requirement: 0 } : x);
const orgRequirements = {};
(teachers || []).forEach(t => {
normalizeItems(t.groups).forEach(g => { if (g.requirement > 0) orgRequirements[g.name] = g.requirement; });
normalizeItems(t.classes).forEach(c => { if (c.requirement > 0) orgRequirements[c.name] = c.requirement; });
});
const savedOrgs = currentUser.savedOrgs || [];
const orgSummaries = […new Set([…savedOrgs, …myLogs.map(l => l.organization)])].map(org => {
const orgLogs     = myLogs.filter(l => l.organization === org);
const orgApproved = orgLogs.filter(l => l.status === “approved”).reduce((s, l) => s + l.hours, 0);
const requirement = orgRequirements[org] || 0;
return { org, orgApproved, requirement, hasLogs: orgLogs.length > 0 };
}).filter(s => s.hasLogs || savedOrgs.includes(s.org));

const stats = [
{ label: “Total Hours”,    value: totalHours,    sub: “approved”,    highlight: true },
{ label: “ISL Hours”,      value: islHours,      sub: “approved” },
{ label: “Arrupe Hours”,   value: arrupeHours,   sub: “approved” },
{ label: “Pending Review”, value: pending.length, sub: “submissions” },
{ label: “Upcoming Events”,value: upcoming.length, sub: “signed up” },
];

return (
<div className=“fade-in” style={{ maxWidth: 900, margin: “0 auto”, padding: “2rem 1.5rem” }}>

```
  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "var(--maroon)", marginBottom: "0.25rem" }}>
    Welcome back, {currentUser.name.split(" ")[0]}.
  </h1>
  <p style={{ color: "var(--gray-500)", marginBottom: "2rem" }}>{currentUser.grade} · {currentUser.email}</p>

  {/* Stats row */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
    {stats.map(s => (
      <div key={s.label} style={{ background: s.highlight ? "var(--maroon)" : "white", borderRadius: "var(--radius)", padding: "1.25rem", boxShadow: "var(--shadow-sm)", border: s.highlight ? "none" : "1px solid var(--gray-100)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: s.highlight ? "var(--gold)" : "var(--maroon)" }}>{s.value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: s.highlight ? "rgba(255,255,255,0.7)" : "var(--gray-500)", marginBottom: 2 }}>{s.label}</div>
        <div style={{ fontSize: 11, color: s.highlight ? "rgba(255,255,255,0.45)" : "var(--gray-400)" }}>{s.sub}</div>
      </div>
    ))}
  </div>

  {/* Quick actions */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
    <button onClick={() => setPage("log-hours")} style={{ background: "var(--maroon)", color: "white", border: "none", borderRadius: "var(--radius)", padding: "1.5rem", textAlign: "left", cursor: "pointer", boxShadow: "var(--shadow-md)" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>Log Hours</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Submit a new service entry</div>
    </button>
    <button onClick={() => setPage("my-service")} style={{ background: "white", color: "var(--maroon)", border: "1px solid var(--gray-100)", borderRadius: "var(--radius)", padding: "1.5rem", textAlign: "left", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>My Service Record</div>
      <div style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>View all submitted hours</div>
    </button>
  </div>

  {/* Per-org progress mini cards */}
  {orgSummaries.length > 0 && (
    <div style={{ marginBottom: "2rem" }}>
      <SectionHeader title="Your Organizations" action={{ label: "Full record", onClick: () => setPage("my-service") }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
        {orgSummaries.map(({ org, orgApproved, requirement }) => {
          const pct      = requirement > 0 ? Math.min(100, Math.round((orgApproved / requirement) * 100)) : null;
          const barColor = pct === null ? "var(--maroon)" : pct >= 100 ? "var(--success)" : pct >= 60 ? "var(--warn)" : "var(--error)";
          const done     = pct !== null && pct >= 100;
          return (
            <div key={org} onClick={() => setPage("my-service")} style={{ background: "white", borderRadius: "var(--radius)", padding: "0.875rem 1rem", boxShadow: "var(--shadow-sm)", border: done ? "1px solid #A8DDB8" : "1px solid var(--gray-100)", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              {done && (
                <div style={{ position: "absolute", top: 0, right: 0, background: "var(--success)", color: "white", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderBottomLeftRadius: 6 }}>DONE</div>
              )}
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--maroon)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{org}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: done ? "var(--success)" : "var(--gray-700)", marginBottom: 6 }}>
                {orgApproved} hrs{requirement > 0 ? " / " + requirement : ""}
              </div>
              <div style={{ height: 6, background: "var(--gray-100)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: (pct !== null ? pct : 0) + "%", background: pct !== null ? barColor : "var(--gray-100)", borderRadius: 10 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Pending entries warning */}
  {pending.length > 0 && (
    <div style={{ background: "var(--warn-bg)", border: "1px solid #D4B030", borderRadius: "var(--radius)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
      <div style={{ fontWeight: 700, color: "var(--warn)", marginBottom: 4 }}>Hours Awaiting Review ({pending.length})</div>
      {pending.map(l => (
        <div key={l.id} style={{ fontSize: 13, color: "var(--gray-700)", padding: "2px 0" }}>{l.organization} — {l.hours} hrs on {shortDate(l.date)}</div>
      ))}
    </div>
  )}

  {/* Upcoming events */}
  {upcoming.length > 0 && (
    <div>
      <SectionHeader title="Upcoming Service Events" action={{ label: "Browse more", onClick: () => setPage("browse") }} />
      {upcoming.slice(0, 3).map(o => (
        <div key={o.id} style={{ background: "white", borderRadius: "var(--radius)", padding: "1rem 1.25rem", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-100)", marginBottom: "0.75rem", borderLeft: "4px solid var(--maroon)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <span style={typeBadgeStyle(o.type)}>{o.type}</span>
              <span style={{ fontWeight: 700, marginLeft: 8 }}>{o.organization}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--gray-500)" }}>{formatDate(o.date)}</div>
          </div>
        </div>
      ))}
    </div>
  )}

</div>
```

);
}

// ============================================================
// LOG HOURS — Multi-org submission form
// ============================================================
function LogHours() {
const { currentUser, setCurrentUser, hourLogs, setHourLogs, students, setStudents, showToast, setPage, addNotification } = useContext(AppContext);
const [step, setStep] = useState(1);
const canvasRef = useRef(null);
const [isSigning, setIsSigning] = useState(false);
const [signatureData, setSignatureData] = useState(null);
const [photoCount, setPhotoCount] = useState(0);
const [submitted, setSubmitted] = useState(false);
const [submittedEntries, setSubmittedEntries] = useState([]);

const savedOrgs = currentUser.savedOrgs || [];

// Each entry = one org with its own hours, category, reflection
const blankEntry = () => ({ org: “”, category: “ISL”, hours: “”, reflection: “”, customOrg: “”, useCustom: false });
const [entries, setEntries] = useState([blankEntry()]);
const [date, setDate] = useState(new Date().toISOString().split(“T”)[0]);
const [supName, setSupName] = useState(””);
const [supEmail, setSupEmail] = useState(””);
const [attachLocation, setAttachLocation] = useState(false);
const [newSavedOrg, setNewSavedOrg] = useState(””);
const [showAddOrg, setShowAddOrg] = useState(false);

const updateEntry = (i, key, val) => setEntries(prev => prev.map((e, idx) => idx === i ? { …e, [key]: val } : e));

const addEntry = () => setEntries(prev => […prev, blankEntry()]);
const removeEntry = (i) => setEntries(prev => prev.filter((_, idx) => idx !== i));

const saveNewOrg = () => {
if (!newSavedOrg.trim()) return;
const updated = […savedOrgs, newSavedOrg.trim()];
const updatedUser = { …currentUser, savedOrgs: updated };
setCurrentUser(updatedUser);
setStudents(prev => prev.map(s => s.email === currentUser.email ? updatedUser : s));
setNewSavedOrg(””);
setShowAddOrg(false);
showToast(“Organization saved to your profile.”);
};

const effectiveOrg = (entry) => entry.useCustom ? entry.customOrg.trim() : entry.org;

const entryValid = (e) => {
const org = effectiveOrg(e);
return org && e.hours && parseFloat(e.hours) > 0 && e.category && e.reflection.trim().length >= 20;
};
const step1Valid = date && entries.length > 0 && entries.every(entryValid);
const step2Valid = supName.trim() && supEmail.trim();

// Canvas signature
useEffect(() => {
if (step !== 2 || !canvasRef.current) return;
const canvas = canvasRef.current;
const ctx = canvas.getContext(“2d”);
let drawing = false;
ctx.strokeStyle = “#1a1a1a”; ctx.lineWidth = 2; ctx.lineCap = “round”;
const getPos = (e) => { const r = canvas.getBoundingClientRect(); const src = e.touches ? e.touches[0] : e; return { x: src.clientX - r.left, y: src.clientY - r.top }; };
const start = (e) => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); };
const draw = (e) => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); setIsSigning(true); e.preventDefault(); };
const end = () => { drawing = false; setSignatureData(canvas.toDataURL()); };
canvas.addEventListener(“mousedown”, start); canvas.addEventListener(“mousemove”, draw); canvas.addEventListener(“mouseup”, end);
canvas.addEventListener(“touchstart”, start, { passive: false }); canvas.addEventListener(“touchmove”, draw, { passive: false }); canvas.addEventListener(“touchend”, end);
return () => { canvas.removeEventListener(“mousedown”, start); canvas.removeEventListener(“mousemove”, draw); canvas.removeEventListener(“mouseup”, end); canvas.removeEventListener(“touchstart”, start); canvas.removeEventListener(“touchmove”, draw); canvas.removeEventListener(“touchend”, end); };
}, [step]);

const clearSig = () => { const c = canvasRef.current; if (c) { c.getContext(“2d”).clearRect(0, 0, c.width, c.height); } setSignatureData(null); setIsSigning(false); };

const submit = () => {
const now = new Date().toISOString().split(“T”)[0];
const newLogs = entries.map((e, i) => ({
id: Date.now() + i,
studentEmail: currentUser.email, studentName: currentUser.name,
organization: effectiveOrg(e), category: e.category,
date, hours: parseFloat(e.hours),
supervisorName: supName, supervisorEmail: supEmail,
reflection: e.reflection,
status: “pending”, reviewedBy: null, reviewNote: “”,
submittedAt: now, hasSignature: !!signatureData,
photoCount, attachedLocation: attachLocation,
}));
setHourLogs(prev => […prev, …newLogs]);
const totalHours = entries.reduce((s, e) => s + parseFloat(e.hours || 0), 0);
addNotification(currentUser.email, `${entries.length} service ${entries.length === 1 ? "entry" : "entries"} totaling ${totalHours} hours submitted for review.`, “info”);
setSubmittedEntries(newLogs);
setSubmitted(true);
showToast(“Hours submitted for review.”);
};

const resetForm = () => {
setSubmitted(false); setStep(1);
setEntries([blankEntry()]); setDate(new Date().toISOString().split(“T”)[0]);
setSupName(””); setSupEmail(””); setAttachLocation(false);
setSignatureData(null); setIsSigning(false); setPhotoCount(0);
};

if (submitted) return (
<div className=“fade-in” style={{ maxWidth: 620, margin: “4rem auto”, padding: “2rem 1.5rem”, textAlign: “center” }}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, padding: “3rem”, boxShadow: “var(–shadow-md)”, border: “1px solid var(–gray-100)” }}>
<div style={{ width: 56, height: 56, borderRadius: “50%”, background: “var(–success-bg)”, border: “2px solid #A8DDB8”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 1.5rem” }}>
<div style={{ width: 20, height: 20, borderLeft: “3px solid var(–success)”, borderBottom: “3px solid var(–success)”, transform: “rotate(-45deg)”, marginTop: -4 }} />
</div>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 26, color: “var(–maroon)”, marginBottom: “0.75rem” }}>Hours Submitted</h2>
<div style={{ marginBottom: “1.5rem” }}>
{submittedEntries.map((e, i) => (
<div key={i} style={{ display: “flex”, justifyContent: “space-between”, padding: “8px 0”, borderBottom: “1px solid var(–gray-100)”, fontSize: 14 }}>
<span style={{ color: “var(–gray-700)” }}>{e.organization}</span>
<span style={{ fontWeight: 700, color: “var(–maroon)” }}>{e.hours} hrs</span>
</div>
))}
<div style={{ display: “flex”, justifyContent: “space-between”, padding: “10px 0”, fontSize: 15, fontWeight: 700 }}>
<span>Total</span>
<span style={{ color: “var(–maroon)” }}>{submittedEntries.reduce((s, e) => s + e.hours, 0)} hrs</span>
</div>
</div>
<p style={{ color: “var(–gray-500)”, marginBottom: “2rem”, fontSize: 14, lineHeight: 1.6 }}>Your entries are pending review. You will be notified once approved.</p>
<div style={{ display: “flex”, gap: 12, justifyContent: “center” }}>
<button onClick={resetForm} style={{ background: “var(–maroon)”, color: “white”, border: “none”, padding: “11px 24px”, borderRadius: 8, fontWeight: 700, cursor: “pointer” }}>Log More Hours</button>
<button onClick={() => setPage(“my-service”)} style={{ background: “white”, color: “var(–maroon)”, border: “1px solid var(–gray-200)”, padding: “11px 24px”, borderRadius: 8, fontWeight: 600, cursor: “pointer” }}>View My Record</button>
</div>
</div>
</div>
);

const inputBox = { background: “white”, border: “1.5px solid var(–gray-200)”, borderRadius: 8, padding: “11px 14px”, width: “100%”, fontSize: 14, fontFamily: “‘Source Sans 3’, sans-serif”, outline: “none” };
const sectionBox = { background: “var(–gray-50)”, borderRadius: 8, border: “1px solid var(–gray-100)”, overflow: “hidden”, marginBottom: “1rem” };
const sectionHead = { background: “var(–gray-100)”, padding: “10px 16px”, display: “flex”, justifyContent: “space-between”, alignItems: “center”, fontSize: 13, fontWeight: 700, color: “var(–gray-700)”, textTransform: “uppercase”, letterSpacing: “0.5px” };

return (
<div className=“fade-in” style={{ maxWidth: 720, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 30, color: “var(–maroon)”, marginBottom: “0.25rem” }}>Log Service Hours</h1>
<p style={{ color: “var(–gray-500)”, marginBottom: “2rem”, fontSize: 14 }}>Log hours for one or more organizations on the same date. Each organization gets its own entry and reflection.</p>

```
  {/* Step indicator */}
  <div style={{ display: "flex", marginBottom: "2rem", borderRadius: 8, overflow: "hidden", border: "1px solid var(--gray-200)" }}>
    {["1. Service Details", "2. Verification"].map((label, i) => (
      <div key={i} style={{ flex: 1, padding: "10px 0", textAlign: "center", fontSize: 13, fontWeight: 700, background: step === i + 1 ? "var(--maroon)" : "white", color: step === i + 1 ? "var(--gold)" : step > i + 1 ? "var(--success)" : "var(--gray-400)", borderRight: i === 0 ? "1px solid var(--gray-200)" : "none" }}>{label}</div>
    ))}
  </div>

  {step === 1 && (
    <div className="slide-in">
      {/* Date — shared across all entries */}
      <div className="form-group">
        <label>Date of Service</label>
        <div style={{ background: "var(--maroon)", borderRadius: 8, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inputBox, background: "transparent", border: "none", color: "white", padding: 0, fontSize: 15, fontWeight: 600, width: "auto", outline: "none" }} />
        </div>
      </div>

      {/* Save a new org to profile */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Saved Organizations</div>
          <button onClick={() => setShowAddOrg(!showAddOrg)} style={{ background: "none", border: "1px solid var(--gray-200)", color: "var(--maroon)", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Save New Org</button>
        </div>
        {showAddOrg && (
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={newSavedOrg} onChange={e => setNewSavedOrg(e.target.value)} placeholder="e.g. Clavius Honors Program, NHS, Sarah's Inn..." style={{ ...inputBox, flex: 1 }} onKeyDown={e => e.key === "Enter" && saveNewOrg()} />
            <button onClick={saveNewOrg} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "0 16px", borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save</button>
            <button onClick={() => { setShowAddOrg(false); setNewSavedOrg(""); }} style={{ background: "var(--gray-100)", color: "var(--gray-600)", border: "none", padding: "0 12px", borderRadius: 7, cursor: "pointer" }}>Cancel</button>
          </div>
        )}
        {savedOrgs.length === 0 && !showAddOrg && (
          <div style={{ fontSize: 12, color: "var(--gray-400)", padding: "8px 0" }}>No saved organizations yet. Save one above, or type a custom name in each entry below.</div>
        )}
        {savedOrgs.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {savedOrgs.map(org => (
              <span key={org} style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", color: "var(--maroon)", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{org}</span>
            ))}
          </div>
        )}
      </div>

      {/* Per-organization entries */}
      {entries.map((entry, i) => (
        <div key={i} style={{ background: "white", border: "1.5px solid var(--gray-200)", borderRadius: 10, padding: "1.25rem", marginBottom: "1rem", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "var(--maroon)" }}>Entry {i + 1}</div>
            {entries.length > 1 && (
              <button onClick={() => removeEntry(i)} style={{ background: "var(--error-bg)", color: "var(--error)", border: "1px solid #F5AEAE", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Remove</button>
            )}
          </div>

          {/* Org selection: saved orgs + custom type-in */}
          <div className="form-group">
            <label>Organization or Program</label>
            {savedOrgs.length > 0 && !entry.useCustom && (
              <div style={{ border: "1.5px solid var(--gray-200)", borderRadius: 8, overflow: "hidden", background: "white", marginBottom: 6 }}>
                {savedOrgs.map(org => (
                  <label key={org} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: "1px solid var(--gray-100)", cursor: "pointer", background: entry.org === org ? "var(--gold-pale)" : "white", color: "var(--gray-800)", textTransform: "none", letterSpacing: 0, fontSize: 14, fontWeight: 500, marginBottom: 0 }}>
                    <input type="radio" name={"org-" + i} value={org} checked={entry.org === org} onChange={() => updateEntry(i, "org", org)} style={{ width: "auto", accentColor: "var(--maroon)" }} />
                    {org}
                  </label>
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {entry.useCustom ? (
                <input
                  value={entry.customOrg}
                  onChange={e => updateEntry(i, "customOrg", e.target.value)}
                  placeholder="Type organization or program name..."
                  style={{ ...inputBox, flex: 1 }}
                />
              ) : (
                <input
                  value={entry.customOrg}
                  onChange={e => { updateEntry(i, "customOrg", e.target.value); updateEntry(i, "useCustom", true); updateEntry(i, "org", ""); }}
                  placeholder={savedOrgs.length > 0 ? "Or type a different organization..." : "Type organization or program name..."}
                  style={{ ...inputBox, flex: 1 }}
                />
              )}
              {entry.useCustom && savedOrgs.length > 0 && (
                <button onClick={() => { updateEntry(i, "useCustom", false); updateEntry(i, "customOrg", ""); }} style={{ background: "var(--gray-100)", color: "var(--gray-600)", border: "none", padding: "10px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Use Saved</button>
              )}
            </div>
          </div>

          {/* Hours + Category side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Hours</label>
              <input type="number" min="0.5" max="24" step="0.5" value={entry.hours} onChange={e => updateEntry(i, "hours", e.target.value)} placeholder="0.0" style={{ ...inputBox, fontSize: 22, fontWeight: 700, color: "var(--maroon)", textAlign: "center" }} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Category</label>
              <select value={entry.category} onChange={e => updateEntry(i, "category", e.target.value)} style={{ ...inputBox, height: "100%" }}>
                {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Reflection */}
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <label>Reflection <span style={{ fontSize: 11, fontWeight: 400, color: "var(--gray-400)", textTransform: "none" }}>— min. 20 characters</span></label>
            <textarea value={entry.reflection} onChange={e => updateEntry(i, "reflection", e.target.value)} rows={3} placeholder="What did you do? What did you learn? How did it affect you?" style={{ ...inputBox, resize: "vertical", lineHeight: 1.5 }} />
            <div style={{ fontSize: 12, color: entry.reflection.length < 20 ? "var(--error)" : "var(--success)", textAlign: "right", marginTop: 2 }}>{entry.reflection.length} / 20 min</div>
          </div>
        </div>
      ))}

      <button onClick={addEntry} style={{ width: "100%", background: "white", color: "var(--maroon)", border: "2px dashed var(--maroon)", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: "1.5rem" }}>
        + Add Another Organization
      </button>

      {/* Hours summary */}
      {entries.length > 1 && (
        <div style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", borderRadius: 8, padding: "10px 16px", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, color: "var(--maroon)", fontSize: 14 }}>{entries.length} organizations</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--maroon)" }}>{entries.reduce((s, e) => s + (parseFloat(e.hours) || 0), 0)} hrs total</span>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => step1Valid && setStep(2)} style={{ background: step1Valid ? "var(--maroon)" : "var(--gray-200)", color: step1Valid ? "var(--gold)" : "var(--gray-400)", border: "none", padding: "13px 32px", borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: step1Valid ? "pointer" : "not-allowed", transition: "all 0.2s" }}>Next: Verification</button>
      </div>
    </div>
  )}

  {step === 2 && (
    <div className="slide-in">
      {/* Summary of what's being verified */}
      <div style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", borderRadius: 8, padding: "14px 18px", marginBottom: "1.5rem" }}>
        <div style={{ fontWeight: 700, color: "var(--maroon)", marginBottom: 8 }}>Verifying hours for {shortDate(date)}:</div>
        {entries.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--gray-700)", padding: "3px 0" }}>
            <span>{effectiveOrg(e)}</span>
            <span style={{ fontWeight: 600 }}>{e.hours} hrs</span>
          </div>
        ))}
        {entries.length > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "var(--maroon)", borderTop: "1px solid #EDE0C0", marginTop: 6, paddingTop: 6 }}>
            <span>Total</span>
            <span>{entries.reduce((s, e) => s + (parseFloat(e.hours) || 0), 0)} hrs</span>
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--maroon)", marginBottom: "0.25rem" }}>Supervisor Verification</h3>
      <p style={{ color: "var(--gray-500)", fontSize: 14, marginBottom: "1.5rem" }}>Enter your supervisor's contact info. They will be contacted to confirm your hours.</p>

      <div className="form-group"><label>Supervisor Name</label><input value={supName} onChange={e => setSupName(e.target.value)} placeholder="e.g. Janet Rowe" style={inputBox} /></div>
      <div className="form-group"><label>Supervisor Email</label><input type="email" value={supEmail} onChange={e => setSupEmail(e.target.value)} placeholder="supervisor@organization.org" style={inputBox} /></div>

      {/* Signature */}
      <div style={sectionBox}>
        <div style={sectionHead}>
          <span>Supervisor Signature</span>
          {signatureData && <button onClick={clearSig} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--error)", fontSize: 13, fontWeight: 700 }}>Clear</button>}
        </div>
        <div style={{ padding: "0.75rem", background: "white" }}>
          <canvas ref={canvasRef} width={580} height={120} style={{ border: "1px solid var(--gray-200)", borderRadius: 6, width: "100%", height: 120, cursor: "crosshair", background: "var(--gray-50)", display: "block", touchAction: "none" }} />
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 6 }}>{isSigning ? "Signature captured" : "Draw signature above"}</div>
        </div>
      </div>

      {/* Photos */}
      <div style={sectionBox}>
        <div style={sectionHead}>
          <span>Photos (optional)</span>
          {photoCount > 0 && <button onClick={() => setPhotoCount(0)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--error)", fontSize: 13, fontWeight: 700 }}>Clear</button>}
        </div>
        <div style={{ padding: "1.25rem", background: "white" }}>
          <input type="file" id="photoUpload" multiple accept="image/*" onChange={e => setPhotoCount(Math.min(e.target.files.length, 3))} style={{ display: "none" }} />
          <label htmlFor="photoUpload" style={{ cursor: "pointer", display: "block", textAlign: "center", color: "var(--maroon)", fontWeight: 600, fontSize: 14, padding: "0.5rem", border: "1.5px dashed var(--gray-200)", borderRadius: 8 }}>
            {photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? "s" : ""} selected` : "Click to attach photos"}
            <span style={{ color: "var(--gray-400)", fontWeight: 400 }}> (up to 3)</span>
          </label>
        </div>
      </div>

      {/* Location toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--gray-100)", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-700)" }}>Attach My Location</span>
        <button onClick={() => setAttachLocation(!attachLocation)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: attachLocation ? "var(--maroon)" : "var(--gray-200)", cursor: "pointer", transition: "background 0.2s", position: "relative" }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: attachLocation ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
        <button onClick={() => setStep(1)} style={{ background: "white", color: "var(--maroon)", border: "1px solid var(--gray-200)", padding: "12px 24px", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Previous</button>
        <button onClick={() => step2Valid && submit()} style={{ background: step2Valid ? "var(--maroon)" : "var(--gray-200)", color: step2Valid ? "var(--gold)" : "var(--gray-400)", border: "none", padding: "13px 32px", borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: step2Valid ? "pointer" : "not-allowed", transition: "all 0.2s" }}>Submit Hours</button>
      </div>
    </div>
  )}
</div>
```

);
}

// ============================================================
// MY SERVICE — tabbed record view + per-org progress
// ============================================================
function MyService() {
const { currentUser, hourLogs, setPage, teachers } = useContext(AppContext);
const [tab, setTab] = useState(“pending”);

const myLogs      = hourLogs.filter(l => l.studentEmail === currentUser.email);
const pending     = myLogs.filter(l => l.status === “pending”);
const approved    = myLogs.filter(l => l.status === “approved”);
const denied      = myLogs.filter(l => l.status === “denied”);
const totalApproved = approved.reduce((s, l) => s + l.hours, 0);
const islHours      = approved.filter(l => l.category === “ISL”).reduce((s, l) => s + l.hours, 0);
const arrupeHours   = approved.filter(l => l.category === “Arrupe”).reduce((s, l) => s + l.hours, 0);

const tabs  = [
{ key: “pending”,  label: “Pending”,  count: pending.length  },
{ key: “approved”, label: “Approved”, count: approved.length },
{ key: “denied”,   label: “Denied”,   count: denied.length   },
];
const lists = { pending, approved, denied };

// Per-org progress
const normalizeItems = (arr) => (arr || []).map(x => typeof x === “string” ? { name: x, requirement: 0 } : x);
const orgRequirements = {};
(teachers || []).forEach(t => {
normalizeItems(t.groups).forEach(g => { if (g.requirement > 0) orgRequirements[g.name] = g.requirement; });
normalizeItems(t.classes).forEach(c => { if (c.requirement > 0) orgRequirements[c.name] = c.requirement; });
});
const savedOrgs   = currentUser.savedOrgs || [];
const orgNames    = […new Set([…savedOrgs, …myLogs.map(l => l.organization)])];
const orgSummaries = orgNames.map(org => {
const orgLogs     = myLogs.filter(l => l.organization === org);
const orgApproved = orgLogs.filter(l => l.status === “approved”).reduce((s, l) => s + l.hours, 0);
const orgPending  = orgLogs.filter(l => l.status === “pending”).reduce((s, l) => s + l.hours, 0);
const requirement = orgRequirements[org] || 0;
return { org, orgApproved, orgPending, orgLogs, requirement };
}).filter(s => s.orgLogs.length > 0 || savedOrgs.includes(s.org));

function LogRow({ log }) {
const badge = statusBadge(log.status);
return (
<div style={{ background: “white”, borderRadius: “var(–radius)”, padding: “1.25rem”, boxShadow: “var(–shadow-sm)”, border: “1px solid var(–gray-100)”, marginBottom: “0.75rem” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, flexWrap: “wrap”, gap: 8 }}>
<div style={{ flex: 1, minWidth: 200 }}>
<div style={{ display: “flex”, gap: 8, alignItems: “center”, marginBottom: 4 }}>
<span style={typeBadgeStyle(log.category)}>{log.category}</span>
<span style={{ fontWeight: 700, fontSize: 15 }}>{log.organization}</span>
</div>
<div style={{ fontSize: 13, color: “var(–gray-500)” }}>
{shortDate(log.date)} · {log.hours} hour{log.hours !== 1 ? “s” : “”} · Supervisor: {log.supervisorName}
</div>
{log.reflection && (
<div style={{ fontSize: 13, color: “var(–gray-600)”, marginTop: 6, fontStyle: “italic”, borderLeft: “3px solid var(–gray-200)”, paddingLeft: 10 }}>
{”“”}{log.reflection.length > 120 ? log.reflection.slice(0, 120) + “…” : log.reflection}{”””}
</div>
)}
{log.reviewNote && (
<div style={{ fontSize: 12, color: “var(–gray-500)”, marginTop: 6 }}>Teacher note: {log.reviewNote}</div>
)}
</div>
<div style={badge.style}>{badge.label}</div>
</div>
</div>
);
}

return (
<div className=“fade-in” style={{ maxWidth: 900, margin: “0 auto”, padding: “2rem 1.5rem” }}>

```
  {/* Header */}
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "var(--maroon)" }}>My Service Record</h1>
    <button onClick={() => setPage("log-hours")} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>+ Log Hours</button>
  </div>

  {/* Overall stats */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
    {[
      { label: "Total Approved", value: totalApproved + " hrs", highlight: true },
      { label: "ISL Hours",      value: islHours + " hrs" },
      { label: "Arrupe Hours",   value: arrupeHours + " hrs" },
      { label: "Pending Review", value: pending.length },
    ].map(s => (
      <div key={s.label} style={{ background: s.highlight ? "var(--maroon)" : "white", borderRadius: "var(--radius)", padding: "1.25rem", boxShadow: "var(--shadow-sm)", border: s.highlight ? "none" : "1px solid var(--gray-100)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: s.highlight ? "var(--gold)" : "var(--maroon)" }}>{s.value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: s.highlight ? "rgba(255,255,255,0.7)" : "var(--gray-500)", marginTop: 2 }}>{s.label}</div>
      </div>
    ))}
  </div>

  {/* Per-org progress */}
  {orgSummaries.length > 0 && (
    <div style={{ marginBottom: "2rem" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--maroon)", marginBottom: "0.875rem" }}>Progress by Organization</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.875rem" }}>
        {orgSummaries.map(({ org, orgApproved, orgPending, requirement }) => {
          const pct      = requirement > 0 ? Math.min(100, Math.round((orgApproved / requirement) * 100)) : null;
          const barColor = pct === null ? "var(--maroon)" : pct >= 100 ? "var(--success)" : pct >= 60 ? "var(--warn)" : "var(--error)";
          const done     = pct !== null && pct >= 100;
          return (
            <div key={org} style={{ background: "white", borderRadius: "var(--radius)", padding: "1rem 1.125rem", boxShadow: "var(--shadow-sm)", border: done ? "1px solid #A8DDB8" : "1px solid var(--gray-100)", position: "relative", overflow: "hidden" }}>
              {done && (
                <div style={{ position: "absolute", top: 0, right: 0, background: "var(--success)", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderBottomLeftRadius: 8 }}>COMPLETE</div>
              )}
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--maroon)", marginBottom: 2, paddingRight: done ? 60 : 0 }}>{org}</div>
              <div style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: "var(--maroon)" }}>{orgApproved} hrs approved</span>
                {orgPending > 0 && (
                  <span style={{ color: "var(--warn)", marginLeft: 8 }}>+{orgPending} pending</span>
                )}
              </div>
              {requirement > 0 ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--gray-500)", marginBottom: 4 }}>
                    <span>Goal: {requirement} hrs</span>
                    <span style={{ color: barColor, fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 8, background: "var(--gray-100)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct + "%", background: barColor, borderRadius: 10, transition: "width 0.5s ease" }} />
                  </div>
                  {!done && requirement - orgApproved > 0 && (
                    <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 4 }}>{requirement - orgApproved} hrs remaining</div>
                  )}
                </div>
              ) : (
                <div style={{ height: 8, background: "var(--gray-100)", borderRadius: 10 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Tab bar */}
  <div style={{ display: "flex", borderBottom: "2px solid var(--gray-100)", marginBottom: "1.5rem" }}>
    {tabs.map(t => {
      const isActive  = tab === t.key;
      const isPending = t.key === "pending";
      return (
        <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "0.65rem 1.4rem", fontSize: 14, fontWeight: isActive ? 700 : 500, fontFamily: "'Source Sans 3', sans-serif", border: "none", borderBottom: isActive ? (isPending ? "3px solid var(--gold)" : "3px solid var(--maroon)") : "3px solid transparent", background: "none", color: isActive ? "var(--maroon)" : "var(--gray-400)", cursor: "pointer", marginBottom: "-2px", display: "flex", alignItems: "center", gap: 6 }}>
          {t.label}
          <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 10, background: isActive ? (isPending ? "var(--gold)" : "var(--maroon)") : "var(--gray-100)", color: isActive ? (isPending ? "var(--maroon-dark)" : "white") : "var(--gray-400)", minWidth: 20, textAlign: "center" }}>{t.count}</span>
        </button>
      );
    })}
  </div>

  {/* Entry list */}
  {lists[tab].length === 0
    ? <EmptyState message={"No " + tab + " entries."} />
    : lists[tab].map(l => <LogRow key={l.id} log={l} />)
  }

</div>
```

);
}

// ============================================================
// BROWSE OPPORTUNITIES
// ============================================================
function BrowseOpportunities() {
const { currentUser, opportunities, setOpportunities, showToast, addNotification } = useContext(AppContext);
const [filter, setFilter] = useState({ type: “All”, category: “All”, search: “” });
const [selectedOpp, setSelectedOpp] = useState(null);
const cats = [“All”, …new Set(opportunities.map(o => o.category))];
const filtered = opportunities.filter(o => !o.cancelled && daysUntil(o.date) >= 0 && (filter.type === “All” || o.type === filter.type) && (filter.category === “All” || o.category === filter.category) && (!filter.search || o.organization.toLowerCase().includes(filter.search.toLowerCase()) || o.description.toLowerCase().includes(filter.search.toLowerCase())));
const isSignedUp = (o) => o.signups.includes(currentUser.email);
const isApproved = (o) => o.approved.includes(currentUser.email);
const isPending = (o) => o.pending.includes(currentUser.email);
const signup = (opp) => {
if (isSignedUp(opp)) return;
setOpportunities(prev => prev.map(o => o.id === opp.id ? { …o, signups: […o.signups, currentUser.email], pending: […o.pending, currentUser.email], spotsLeft: o.spotsLeft - 1 } : o));
addNotification(currentUser.email, `You signed up for ${opp.organization} on ${formatDate(opp.date)}. Awaiting teacher approval.`, “info”);
showToast(“Signed up! Awaiting approval.”);
setSelectedOpp(null);
};
return (
<div className=“fade-in” style={{ maxWidth: 900, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)”, marginBottom: “1.5rem” }}>Browse Opportunities</h1>
<div style={{ display: “flex”, gap: 10, marginBottom: “1.5rem”, flexWrap: “wrap”, alignItems: “center” }}>
<input value={filter.search} onChange={e => setFilter(f => ({ …f, search: e.target.value }))} placeholder=“Search organizations…” style={{ flex: 1, minWidth: 200, padding: “9px 14px”, border: “1.5px solid var(–gray-200)”, borderRadius: 8, fontSize: 14, outline: “none” }} />
<select value={filter.type} onChange={e => setFilter(f => ({ …f, type: e.target.value }))} style={{ padding: “9px 14px”, border: “1.5px solid var(–gray-200)”, borderRadius: 8, fontSize: 14, outline: “none”, background: “white” }}>
{[“All”, “ISL”, “Arrupe”].map(t => <option key={t}>{t}</option>)}
</select>
<select value={filter.category} onChange={e => setFilter(f => ({ …f, category: e.target.value }))} style={{ padding: “9px 14px”, border: “1.5px solid var(–gray-200)”, borderRadius: 8, fontSize: 14, outline: “none”, background: “white” }}>
{cats.map(c => <option key={c}>{c}</option>)}
</select>
</div>
<div style={{ color: “var(–gray-500)”, fontSize: 13, marginBottom: “1rem” }}>{filtered.length} opportunities available</div>
{filtered.map(o => (
<div key={o.id} style={{ background: “white”, borderRadius: “var(–radius)”, padding: “1.25rem”, boxShadow: “var(–shadow-sm)”, border: “1px solid var(–gray-100)”, marginBottom: “0.75rem”, cursor: “pointer”, transition: “box-shadow 0.2s” }} onClick={() => setSelectedOpp(o)}>
<div style={{ display: “flex”, justifyContent: “space-between”, flexWrap: “wrap”, gap: 8 }}>
<div>
<div style={{ display: “flex”, gap: 8, alignItems: “center”, marginBottom: 4 }}>
<span style={typeBadgeStyle(o.type)}>{o.type}</span>
<span style={{ fontWeight: 700, fontSize: 15 }}>{o.organization}</span>
{isApproved(o) && <span style={{ fontSize: 11, background: “var(–success-bg)”, color: “var(–success)”, padding: “2px 8px”, borderRadius: 10, fontWeight: 700 }}>Signed Up</span>}
{isPending(o) && !isApproved(o) && <span style={{ fontSize: 11, background: “var(–warn-bg)”, color: “var(–warn)”, padding: “2px 8px”, borderRadius: 10, fontWeight: 700 }}>Pending</span>}
</div>
<div style={{ fontSize: 13, color: “var(–gray-500)” }}>{shortDate(o.date)} · {o.time} · {o.location}</div>
</div>
<div style={{ fontSize: 13, color: o.spotsLeft < 3 ? “var(–error)” : “var(–gray-500)” }}>{o.spotsLeft} spots left</div>
</div>
</div>
))}
{selectedOpp && (
<div style={{ position: “fixed”, inset: 0, background: “rgba(0,0,0,0.5)”, zIndex: 1000, display: “flex”, alignItems: “flex-end”, justifyContent: “center”, padding: “1rem” }} onClick={() => setSelectedOpp(null)}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, padding: “2rem”, maxWidth: 560, width: “100%”, maxHeight: “85vh”, overflowY: “auto” }} onClick={e => e.stopPropagation()}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: “1.25rem” }}>
<div><span style={typeBadgeStyle(selectedOpp.type)}>{selectedOpp.type}</span><h3 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 22, color: “var(–maroon)”, marginTop: 8 }}>{selectedOpp.organization}</h3></div>
<button onClick={() => setSelectedOpp(null)} style={{ background: “none”, border: “none”, fontSize: 20, cursor: “pointer”, color: “var(–gray-400)” }}>x</button>
</div>
<p style={{ color: “var(–gray-600)”, marginBottom: “1rem”, lineHeight: 1.6 }}>{selectedOpp.description}</p>
<div style={{ fontSize: 13, color: “var(–gray-500)”, marginBottom: “1.5rem” }}>{formatDate(selectedOpp.date)}  ·  {selectedOpp.time}  ·  {selectedOpp.location}</div>
{!isSignedUp(selectedOpp) ? (
<button onClick={() => signup(selectedOpp)} style={{ width: “100%”, background: “var(–maroon)”, color: “white”, border: “none”, padding: “13px”, borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: “pointer” }}>Sign Up for This Event</button>
) : <div style={{ textAlign: “center”, color: “var(–success)”, fontWeight: 700, padding: “1rem” }}>You are signed up for this event.</div>}
</div>
</div>
)}
</div>
);
}

// ============================================================
// NOTIFICATIONS PAGE
// ============================================================
function NotificationsPage() {
const { currentUser, notifications, setNotifications } = useContext(AppContext);
const myNotifs = […(notifications[currentUser.email] || [])].reverse();
const markAll = () => setNotifications(prev => ({ …prev, [currentUser.email]: (prev[currentUser.email] || []).map(n => ({ …n, read: true })) }));
return (
<div className=“fade-in” style={{ maxWidth: 700, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: “2rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)” }}>Notifications</h1>
{myNotifs.some(n => !n.read) && <button onClick={markAll} style={{ background: “none”, border: “1px solid var(–maroon)”, color: “var(–maroon)”, padding: “7px 16px”, borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: “pointer” }}>Mark all read</button>}
</div>
{myNotifs.length === 0 ? <EmptyState message="No notifications yet." /> : myNotifs.map(n => (
<div key={n.id} style={{ background: n.read ? “white” : “var(–gold-pale)”, border: `1px solid ${n.read ? "var(--gray-100)" : "#D4B030"}`, borderRadius: “var(–radius)”, padding: “1rem 1.25rem”, marginBottom: “0.75rem” }}>
<div style={{ fontSize: 14, color: “var(–gray-800)”, marginBottom: 4 }}>{n.message}</div>
<div style={{ fontSize: 12, color: “var(–gray-400)” }}>{shortDate(n.date)}</div>
</div>
))}
</div>
);
}

// ============================================================
// TEACHER DASHBOARD
// ============================================================
function TeacherDashboard() {
const { currentUser, setCurrentUser, hourLogs, setHourLogs, students, teachers, setTeachers, addNotification, showToast } = useContext(AppContext);
const [activeTab, setActiveTab] = useState(“review”);
const [searchQuery, setSearchQuery] = useState(””);
const [selectedStudent, setSelectedStudent] = useState(null);
const [reviewModal, setReviewModal] = useState(null);
const [reviewNote, setReviewNote] = useState(””);
const [filterStatus, setFilterStatus] = useState(“pending”);

// Classes + Groups state
const [showCreateClass, setShowCreateClass] = useState(false);
const [showCreateGroup, setShowCreateGroup] = useState(false);
const [newClassName, setNewClassName] = useState(””);
const [newClassReq, setNewClassReq] = useState(””);
const [newGroupName, setNewGroupName] = useState(””);
const [newGroupReq, setNewGroupReq] = useState(””);
const [classStudents, setClassStudents] = useState({});
const [editingReq, setEditingReq] = useState(null); // {type:“class”|“group”, name, val}

// Normalize classes/groups to always be {name, requirement} objects
const normalizeItems = (arr) => (arr || []).map(x => typeof x === “string” ? { name: x, requirement: 0 } : x);
const myClasses = normalizeItems(currentUser.classes);
const myGroups = normalizeItems(currentUser.groups);

const pendingLogs = hourLogs.filter(l => l.status === “pending”);
const filteredStudents = students.filter(s =>
s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
s.email.toLowerCase().includes(searchQuery.toLowerCase())
);

const getStudentLogs = (email) => hourLogs.filter(l => l.studentEmail === email);
const getStudentHours = (email) => hourLogs.filter(l => l.studentEmail === email && l.status === “approved”).reduce((s, l) => s + l.hours, 0);
const getStudentHoursForOrg = (email, orgName) => hourLogs.filter(l => l.studentEmail === email && l.status === “approved” && l.organization === orgName).reduce((s, l) => s + l.hours, 0);

// Update teacher in global state
const updateTeacher = (updatedUser) => {
setCurrentUser(updatedUser);
setTeachers(prev => prev.map(t => t.username === updatedUser.username ? updatedUser : t));
};

const reviewLog = (log, decision) => {
setHourLogs(prev => prev.map(l => l.id === log.id ? { …l, status: decision, reviewedBy: currentUser.username, reviewNote } : l));
addNotification(log.studentEmail,
decision === “approved”
? `Your ${log.hours}-hour entry at ${log.organization} was approved by ${currentUser.name}.`
: `Your ${log.hours}-hour entry at ${log.organization} was not approved. Note: ${reviewNote || "Please see your teacher."}`,
decision === “approved” ? “success” : “info”
);
showToast(decision === “approved” ? “Hours approved.” : “Submission denied.”);
setReviewModal(null); setReviewNote(””);
};

const bulkApprove = (logs) => {
const ids = new Set(logs.map(l => l.id));
setHourLogs(prev => prev.map(l => ids.has(l.id) ? { …l, status: “approved”, reviewedBy: currentUser.username, reviewNote: “Bulk approved.” } : l));
logs.forEach(l => addNotification(l.studentEmail, `Your ${l.hours}-hour entry at ${l.organization} was approved by ${currentUser.name}.`, “success”));
showToast(`${logs.length} entries approved.`);
};

const createClass = () => {
if (!newClassName.trim()) return;
const newClass = { name: newClassName.trim(), requirement: parseInt(newClassReq) || 0 };
const updated = { …currentUser, classes: […(currentUser.classes || []).map(x => typeof x === “string” ? { name: x, requirement: 0 } : x), newClass] };
updateTeacher(updated);
setNewClassName(””); setNewClassReq(””); setShowCreateClass(false);
showToast(“Class created.”);
};

const createGroup = () => {
if (!newGroupName.trim()) return;
const newGroup = { name: newGroupName.trim(), requirement: parseInt(newGroupReq) || 0 };
const updated = { …currentUser, groups: […(currentUser.groups || []).map(x => typeof x === “string” ? { name: x, requirement: 0 } : x), newGroup] };
updateTeacher(updated);
setNewGroupName(””); setNewGroupReq(””); setShowCreateGroup(false);
showToast(“Group created.”);
};

const saveRequirement = () => {
if (!editingReq) return;
const val = parseInt(editingReq.val) || 0;
if (editingReq.type === “class”) {
const updated = { …currentUser, classes: normalizeItems(currentUser.classes).map(c => c.name === editingReq.name ? { …c, requirement: val } : c) };
updateTeacher(updated);
} else {
const updated = { …currentUser, groups: normalizeItems(currentUser.groups).map(g => g.name === editingReq.name ? { …g, requirement: val } : g) };
updateTeacher(updated);
}
setEditingReq(null);
showToast(“Requirement updated.”);
};

const addStudentToClass = (studentEmail, className) => {
setClassStudents(prev => {
const existing = prev[className] || [];
if (existing.includes(studentEmail)) return prev;
return { …prev, [className]: […existing, studentEmail] };
});
showToast(“Student added.”);
};

const removeStudentFromClass = (studentEmail, className) => {
setClassStudents(prev => ({ …prev, [className]: (prev[className] || []).filter(e => e !== studentEmail) }));
};

const exportCSV = (label, rows) => {
const header = “Student,Email,Grade,Organization,Hours,Status,Date\n”;
const body = rows.map(l => `"${l.studentName}","${l.studentEmail}","","${l.organization}",${l.hours},${l.status},${l.date}`).join(”\n”);
const blob = new Blob([header + body], { type: “text/csv” });
const url = URL.createObjectURL(blob);
const a = document.createElement(“a”); a.href = url; a.download = `${label.replace(/\s+/g, "_")}_hours.csv`; a.click();
URL.revokeObjectURL(url);
};

const tabStyle = (t) => ({
padding: “10px 18px”, background: activeTab === t ? “var(–maroon)” : “white”,
color: activeTab === t ? “var(–gold)” : “var(–gray-500)”,
border: “1px solid var(–gray-200)”, borderRadius: 8, fontWeight: 700, fontSize: 13,
cursor: “pointer”, transition: “all 0.15s”, whiteSpace: “nowrap”
});

const ProgressBar = ({ hours, requirement, compact }) => {
if (!requirement) return null;
const pct = Math.min(100, Math.round((hours / requirement) * 100));
const color = pct >= 100 ? “var(–success)” : pct >= 60 ? “var(–warn)” : “var(–error)”;
return (
<div style={{ marginTop: compact ? 4 : 8 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, fontSize: 11, color: “var(–gray-500)”, marginBottom: 3 }}>
<span>{hours} / {requirement} hrs</span>
<span style={{ color, fontWeight: 700 }}>{pct}%</span>
</div>
<div style={{ height: compact ? 5 : 7, background: “var(–gray-100)”, borderRadius: 10, overflow: “hidden” }}>
<div style={{ height: “100%”, width: pct + “%”, background: color, borderRadius: 10, transition: “width 0.4s ease” }} />
</div>
</div>
);
};

return (
<div className=“fade-in” style={{ maxWidth: 1100, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<div style={{ marginBottom: “2rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)”, marginBottom: “0.25rem” }}>Teacher Dashboard</h1>
<p style={{ color: “var(–gray-500)” }}>{currentUser.name} · {currentUser.role}</p>
</div>

```
  {/* Stats */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
    {[
      { label: "Pending Review", value: pendingLogs.length, highlight: pendingLogs.length > 0 },
      { label: "Total Students", value: students.length },
      { label: "Approved Hours", value: hourLogs.filter(l => l.status === "approved").reduce((s, l) => s + l.hours, 0) },
      { label: "My Classes", value: myClasses.length },
      { label: "My Groups", value: myGroups.length },
    ].map(s => (
      <div key={s.label} style={{ background: s.highlight ? "var(--maroon)" : "white", borderRadius: "var(--radius)", padding: "1.25rem", boxShadow: "var(--shadow-sm)", border: s.highlight ? "none" : "1px solid var(--gray-100)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: s.highlight ? "var(--gold)" : "var(--maroon)" }}>{s.value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: s.highlight ? "rgba(255,255,255,0.7)" : "var(--gray-500)", marginTop: 2 }}>{s.label}</div>
      </div>
    ))}
  </div>

  {/* Tab bar */}
  <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
    {[["review", "Review Hours"], ["students", "Search Students"], ["classes", "My Classes"], ["groups", "Groups"]].map(([key, label]) => (
      <button key={key} onClick={() => setActiveTab(key)} style={tabStyle(key)}>
        {label}
        {key === "review" && pendingLogs.length > 0 && (
          <span style={{ background: "var(--gold)", color: "var(--maroon-dark)", borderRadius: 10, padding: "1px 7px", fontSize: 11, marginLeft: 6 }}>{pendingLogs.length}</span>
        )}
      </button>
    ))}
  </div>

  {/* ── REVIEW HOURS TAB ── */}
  {activeTab === "review" && (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["pending", "approved", "denied"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: "7px 16px", borderRadius: 7, border: "1px solid var(--gray-200)", background: filterStatus === s ? "var(--maroon)" : "white", color: filterStatus === s ? "white" : "var(--gray-500)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)} ({hourLogs.filter(l => l.status === s).length})
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {filterStatus === "pending" && hourLogs.filter(l => l.status === "pending").length > 0 && (
            <button onClick={() => bulkApprove(hourLogs.filter(l => l.status === "pending"))} style={{ background: "var(--success-bg)", color: "var(--success)", border: "1px solid #A8DDB8", padding: "7px 16px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Approve All Pending
            </button>
          )}
          <button onClick={() => exportCSV("all_submissions", hourLogs.filter(l => l.status === filterStatus))} style={{ background: "white", color: "var(--maroon)", border: "1px solid var(--gray-200)", padding: "7px 14px", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Export CSV
          </button>
        </div>
      </div>
      {hourLogs.filter(l => l.status === filterStatus).length === 0
        ? <EmptyState message={"No " + filterStatus + " submissions."} />
        : hourLogs.filter(l => l.status === filterStatus).map(log => {
          const badge = statusBadge(log.status);
          return (
            <div key={log.id} style={{ background: "white", borderRadius: "var(--radius)", padding: "1.25rem", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-100)", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={typeBadgeStyle(log.category)}>{log.category}</span>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{log.studentName}</span>
                    <span style={{ color: "var(--gray-400)", fontSize: 13 }}>·</span>
                    <span style={{ fontSize: 13, color: "var(--gray-600)" }}>{log.organization}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 6 }}>{shortDate(log.date)} · {log.hours} hour{log.hours !== 1 ? "s" : ""} · Supervisor: {log.supervisorName} ({log.supervisorEmail})</div>
                  {log.reflection && <div style={{ fontSize: 13, color: "var(--gray-600)", fontStyle: "italic", borderLeft: "3px solid var(--gray-200)", paddingLeft: 10, marginBottom: 6 }}>{"“"}{log.reflection.length > 150 ? log.reflection.slice(0, 150) + "…" : log.reflection}{"”"}</div>}
                  <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--gray-400)" }}>
                    {log.hasSignature && <span>Signature provided</span>}
                    {log.photoCount > 0 && <span>{log.photoCount} photo{log.photoCount > 1 ? "s" : ""}</span>}
                    {log.attachedLocation && <span>Location attached</span>}
                  </div>
                  {log.reviewNote && <div style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 4 }}>Note: {log.reviewNote}</div>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <div style={badge.style}>{badge.label}</div>
                  {log.status === "pending" && (
                    <button onClick={() => { setReviewModal(log); setReviewNote(""); }} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "7px 14px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Review</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  )}

  {/* ── SEARCH STUDENTS TAB ── */}
  {activeTab === "students" && (
    <div className="slide-in">
      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by student name or email..." style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--gray-200)", borderRadius: 9, fontSize: 15, marginBottom: "1.5rem", outline: "none" }} />
      {filteredStudents.map(s => (
        <div key={s.email}>
          <div onClick={() => setSelectedStudent(selectedStudent && selectedStudent.email === s.email ? null : s)} style={{ background: "white", borderRadius: "var(--radius)", padding: "1rem 1.25rem", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-100)", marginBottom: selectedStudent && selectedStudent.email === s.email ? 0 : "0.75rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: selectedStudent && selectedStudent.email === s.email ? 0 : undefined, borderBottomRightRadius: selectedStudent && selectedStudent.email === s.email ? 0 : undefined }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "var(--gray-500)" }}>{s.email} · {s.grade}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--maroon)" }}>{getStudentHours(s.email)}</div>
              <div style={{ fontSize: 11, color: "var(--gray-400)", textTransform: "uppercase" }}>approved hrs</div>
            </div>
          </div>
          {selectedStudent && selectedStudent.email === s.email && (
            <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderTop: "none", borderRadius: "0 0 var(--radius) var(--radius)", padding: "1rem 1.25rem", marginBottom: "0.75rem" }}>
              {getStudentLogs(s.email).length === 0
                ? <div style={{ color: "var(--gray-400)", fontSize: 14, textAlign: "center", padding: "1rem" }}>No service entries yet.</div>
                : getStudentLogs(s.email).map(log => {
                  const badge = statusBadge(log.status);
                  return (
                    <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--gray-100)", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{log.organization}</span>
                        <span style={{ fontSize: 13, color: "var(--gray-500)", marginLeft: 8 }}>{log.hours} hrs · {shortDate(log.date)}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={badge.style}>{badge.label}</div>
                        {log.status === "pending" && <button onClick={() => { setReviewModal(log); setReviewNote(""); }} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Review</button>}
                      </div>
                    </div>
                  );
                })}
              <div style={{ marginTop: "0.75rem", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {myClasses.map(cls => (
                  <button key={cls.name} onClick={() => addStudentToClass(s.email, cls.name)} style={{ background: (classStudents[cls.name] || []).includes(s.email) ? "var(--success-bg)" : "white", color: (classStudents[cls.name] || []).includes(s.email) ? "var(--success)" : "var(--gray-600)", border: "1px solid var(--gray-200)", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {(classStudents[cls.name] || []).includes(s.email) ? "In " : "Add to "}{cls.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )}

  {/* ── MY CLASSES TAB ── */}
  {activeTab === "classes" && (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 14, color: "var(--gray-600)" }}>Create and manage classes. Set hour requirements and track student progress.</div>
        <button onClick={() => setShowCreateClass(true)} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>+ New Class</button>
      </div>
      {showCreateClass && (
        <div style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", borderRadius: "var(--radius)", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: 2, minWidth: 180 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 700, color: "var(--maroon)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.5px" }}>Class Name</label>
              <input value={newClassName} onChange={e => setNewClassName(e.target.value)} placeholder="e.g. ISL Period 3" style={{ padding: "10px 14px", border: "1.5px solid var(--gray-200)", borderRadius: 8, fontSize: 14, outline: "none", width: "100%" }} onKeyDown={e => e.key === "Enter" && createClass()} />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 700, color: "var(--maroon)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.5px" }}>Hour Requirement</label>
              <input type="number" min="0" value={newClassReq} onChange={e => setNewClassReq(e.target.value)} placeholder="e.g. 40" style={{ padding: "10px 14px", border: "1.5px solid var(--gray-200)", borderRadius: 8, fontSize: 14, outline: "none", width: "100%" }} />
            </div>
            <button onClick={createClass} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700, cursor: "pointer", height: 42 }}>Create</button>
            <button onClick={() => setShowCreateClass(false)} style={{ background: "white", color: "var(--gray-600)", border: "1px solid var(--gray-200)", padding: "10px 14px", borderRadius: 8, cursor: "pointer", height: 42 }}>Cancel</button>
          </div>
        </div>
      )}
      {myClasses.length === 0 && !showCreateClass
        ? <EmptyState message="No classes yet. Create your first class to start tracking student progress." />
        : myClasses.map(cls => {
          const clsStudents = (classStudents[cls.name] || []).map(email => students.find(s => s.email === email)).filter(Boolean);
          const clsTotalHours = clsStudents.reduce((sum, s) => sum + getStudentHours(s.email), 0);
          const clsPending = clsStudents.reduce((sum, s) => sum + getStudentLogs(s.email).filter(l => l.status === "pending").length, 0);
          const pendingLst = clsStudents.flatMap(s => getStudentLogs(s.email).filter(l => l.status === "pending"));
          const isEditingReq = editingReq && editingReq.type === "class" && editingReq.name === cls.name;
          return (
            <div key={cls.name} style={{ background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-100)", marginBottom: "1rem", overflow: "hidden" }}>
              <div style={{ background: "var(--maroon)", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>{cls.name}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                    <span>{clsStudents.length} students</span>
                    <span>{clsTotalHours} hrs total</span>
                    {clsPending > 0 && <span style={{ color: "var(--gold)", fontWeight: 700 }}>{clsPending} pending review</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {isEditingReq ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input type="number" min="0" value={editingReq.val} onChange={e => setEditingReq(r => ({ ...r, val: e.target.value }))} style={{ width: 70, padding: "5px 8px", borderRadius: 6, border: "1px solid var(--gray-200)", fontSize: 13 }} />
                      <button onClick={saveRequirement} style={{ background: "var(--gold)", color: "var(--maroon-dark)", border: "none", padding: "5px 12px", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Save</button>
                      <button onClick={() => setEditingReq(null)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", padding: "5px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingReq({ type: "class", name: cls.name, val: cls.requirement || "" })} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      {cls.requirement ? cls.requirement + " hr req." : "Set requirement"}
                    </button>
                  )}
                  {clsPending > 0 && (
                    <button onClick={() => bulkApprove(pendingLst)} style={{ background: "var(--gold)", color: "var(--maroon-dark)", border: "none", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Approve All</button>
                  )}
                  <button onClick={() => exportCSV(cls.name, clsStudents.flatMap(s => getStudentLogs(s.email)))} style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Export</button>
                </div>
              </div>
              {clsStudents.length === 0
                ? <div style={{ padding: "1rem 1.25rem", color: "var(--gray-400)", fontSize: 14 }}>No students added yet. Use Search Students to add students to this class.</div>
                : clsStudents.map(s => {
                  const hrs = getStudentHours(s.email);
                  const pend = getStudentLogs(s.email).filter(l => l.status === "pending").length;
                  return (
                    <div key={s.email} style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid var(--gray-100)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: "var(--gray-500)" }}>{s.grade}</div>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontWeight: 700, color: "var(--maroon)", fontSize: 16 }}>{hrs} hrs</div>
                            {pend > 0 && <div style={{ fontSize: 11, color: "var(--warn)", fontWeight: 600 }}>{pend} pending</div>}
                          </div>
                          <button onClick={() => removeStudentFromClass(s.email, cls.name)} style={{ background: "var(--error-bg)", color: "var(--error)", border: "1px solid #F5AEAE", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Remove</button>
                        </div>
                      </div>
                      {cls.requirement > 0 && <ProgressBar hours={hrs} requirement={cls.requirement} compact />}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  )}

  {/* ── GROUPS TAB ── */}
  {activeTab === "groups" && (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 14, color: "var(--gray-600)" }}>Groups are programs or extracurriculars that require hours. Create your own and students log hours directly to them.</div>
        <button onClick={() => setShowCreateGroup(true)} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>+ New Group</button>
      </div>
      {showCreateGroup && (
        <div style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", borderRadius: "var(--radius)", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: 2, minWidth: 180 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 700, color: "var(--maroon)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.5px" }}>Group Name</label>
              <input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. NHS Service Hours" style={{ padding: "10px 14px", border: "1.5px solid var(--gray-200)", borderRadius: 8, fontSize: 14, outline: "none", width: "100%" }} />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 700, color: "var(--maroon)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.5px" }}>Hour Requirement</label>
              <input type="number" min="0" value={newGroupReq} onChange={e => setNewGroupReq(e.target.value)} placeholder="e.g. 20" style={{ padding: "10px 14px", border: "1.5px solid var(--gray-200)", borderRadius: 8, fontSize: 14, outline: "none", width: "100%" }} />
            </div>
            <button onClick={createGroup} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700, cursor: "pointer", height: 42 }}>Create</button>
            <button onClick={() => setShowCreateGroup(false)} style={{ background: "white", color: "var(--gray-600)", border: "1px solid var(--gray-200)", padding: "10px 14px", borderRadius: 8, cursor: "pointer", height: 42 }}>Cancel</button>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--gray-500)" }}>Students will log hours by entering this exact group name as their organization.</div>
        </div>
      )}
      {myGroups.length === 0 && !showCreateGroup
        ? <EmptyState message="No groups yet. Create a group for any program or extracurricular that requires service hours." />
        : myGroups.map(grp => {
          const grpLogs = hourLogs.filter(l => l.organization === grp.name);
          const grpStudentEmails = [...new Set(grpLogs.map(l => l.studentEmail))];
          const pendingGrp = grpLogs.filter(l => l.status === "pending");
          const isEditingReq = editingReq && editingReq.type === "group" && editingReq.name === grp.name;
          return (
            <div key={grp.name} style={{ background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--gray-100)", marginBottom: "1.5rem", overflow: "hidden" }}>
              <div style={{ background: "var(--maroon-dark)", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>{grp.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{grpStudentEmails.length} students · {grpLogs.filter(l => l.status === "approved").reduce((s, l) => s + l.hours, 0)} hrs approved</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {pendingGrp.length > 0 && <div style={{ background: "var(--gold)", color: "var(--maroon-dark)", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>{pendingGrp.length} pending</div>}
                  {isEditingReq ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input type="number" min="0" value={editingReq.val} onChange={e => setEditingReq(r => ({ ...r, val: e.target.value }))} style={{ width: 70, padding: "5px 8px", borderRadius: 6, border: "1px solid var(--gray-200)", fontSize: 13 }} />
                      <button onClick={saveRequirement} style={{ background: "var(--gold)", color: "var(--maroon-dark)", border: "none", padding: "5px 12px", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Save</button>
                      <button onClick={() => setEditingReq(null)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", padding: "5px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingReq({ type: "group", name: grp.name, val: grp.requirement || "" })} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      {grp.requirement ? grp.requirement + " hr req." : "Set requirement"}
                    </button>
                  )}
                  {pendingGrp.length > 0 && (
                    <button onClick={() => bulkApprove(pendingGrp)} style={{ background: "var(--gold)", color: "var(--maroon-dark)", border: "none", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Approve All</button>
                  )}
                  <button onClick={() => exportCSV(grp.name, grpLogs)} style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Export</button>
                </div>
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                {grpLogs.length === 0
                  ? <div style={{ color: "var(--gray-400)", fontSize: 13, textAlign: "center", padding: "1rem" }}>No hours logged yet. Students log hours by entering "{grp.name}" as their organization.</div>
                  : grpStudentEmails.map(email => {
                    const stuLogs = grpLogs.filter(l => l.studentEmail === email);
                    const stuApproved = stuLogs.filter(l => l.status === "approved").reduce((s, l) => s + l.hours, 0);
                    const stuPending = stuLogs.filter(l => l.status === "pending");
                    const stuName = (stuLogs[0] && stuLogs[0].studentName) || email;
                    return (
                      <div key={email} style={{ borderBottom: "1px solid var(--gray-100)", paddingBottom: "0.875rem", marginBottom: "0.875rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{stuName}</div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{ fontWeight: 700, color: "var(--maroon)", fontSize: 15 }}>{stuApproved} hrs</span>
                            {stuPending.length > 0 && <span style={{ fontSize: 11, color: "var(--warn)", fontWeight: 700 }}>{stuPending.length} pending</span>}
                            {stuPending.length > 0 && <button onClick={() => { setReviewModal(stuPending[0]); setReviewNote(""); }} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Review</button>}
                          </div>
                        </div>
                        {grp.requirement > 0 && <ProgressBar hours={stuApproved} requirement={grp.requirement} compact />}
                      </div>
                    );
                  })}
              </div>
              {grp.requirement > 0 && (
                <div style={{ background: "var(--gray-50)", padding: "0.625rem 1.25rem", borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--gray-500)" }}>
                  <span>Group requirement: {grp.requirement} hrs per student</span>
                  <span style={{ color: "var(--success)", fontWeight: 600 }}>
                    {grpStudentEmails.filter(email => grpLogs.filter(l => l.studentEmail === email && l.status === "approved").reduce((s, l) => s + l.hours, 0) >= grp.requirement).length} / {grpStudentEmails.length} completed
                  </span>
                </div>
              )}
            </div>
          );
        })}
      <div style={{ background: "var(--gold-pale)", border: "1px solid #EDE0C0", borderRadius: "var(--radius)", padding: "1rem 1.25rem", fontSize: 13, color: "var(--gray-600)", marginTop: "1rem" }}>
        <strong style={{ color: "var(--maroon)" }}>How students log hours for a group:</strong> When filling out Log Hours, they enter the exact group name as their organization. The submission will appear here for your review.
      </div>
    </div>
  )}

  {/* Review Modal */}
  {reviewModal && (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: "2rem", maxWidth: 520, width: "100%" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--maroon)", marginBottom: "1rem" }}>Review Submission</h3>
        <div style={{ background: "var(--gray-50)", borderRadius: 8, padding: "1rem", marginBottom: "1rem", fontSize: 14 }}>
          <div><strong>{reviewModal.studentName}</strong> — {reviewModal.organization}</div>
          <div style={{ color: "var(--gray-500)", marginTop: 4 }}>{reviewModal.hours} hrs · {shortDate(reviewModal.date)} · {reviewModal.category}</div>
          <div style={{ marginTop: 8, color: "var(--gray-600)", fontStyle: "italic" }}>{"“"}{reviewModal.reflection}{"”"}</div>
          <div style={{ marginTop: 8, fontSize: 13, color: "var(--gray-500)" }}>Supervisor: {reviewModal.supervisorName} ({reviewModal.supervisorEmail})</div>
          {reviewModal.hasSignature && <div style={{ fontSize: 12, color: "var(--success)", marginTop: 4 }}>Signature provided</div>}
        </div>
        <div className="form-group"><label>Optional Note to Student</label><textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)} rows={3} placeholder="e.g. Great reflection! Hours confirmed." style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-200)", borderRadius: 8, fontSize: 14, resize: "vertical", outline: "none", fontFamily: "'Source Sans 3', sans-serif" }} /></div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={() => setReviewModal(null)} style={{ background: "white", color: "var(--gray-600)", border: "1px solid var(--gray-200)", padding: "10px 18px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => reviewLog(reviewModal, "denied")} style={{ background: "var(--error-bg)", color: "var(--error)", border: "1px solid #F5AEAE", padding: "10px 18px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Deny</button>
          <button onClick={() => reviewLog(reviewModal, "approved")} style={{ background: "var(--maroon)", color: "white", border: "none", padding: "10px 22px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Approve</button>
        </div>
      </div>
    </div>
  )}
</div>
```

);
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard() {
const { hourLogs, students, opportunities, setPage } = useContext(AppContext);
const pending = hourLogs.filter(l => l.status === “pending”);
return (
<div className=“fade-in” style={{ maxWidth: 900, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)”, marginBottom: “2rem” }}>Admin Dashboard</h1>
<div style={{ display: “grid”, gridTemplateColumns: “repeat(auto-fit, minmax(160px, 1fr))”, gap: “1rem”, marginBottom: “2rem” }}>
{[
{ label: “Total Students”, value: students.length, highlight: false },
{ label: “Pending Reviews”, value: pending.length, highlight: pending.length > 0 },
{ label: “Total Hours Logged”, value: hourLogs.reduce((s, l) => s + l.hours, 0) },
{ label: “Active Opportunities”, value: opportunities.filter(o => !o.cancelled && daysUntil(o.date) >= 0).length },
].map(s => (
<div key={s.label} style={{ background: s.highlight ? “var(–maroon)” : “white”, borderRadius: “var(–radius)”, padding: “1.25rem”, boxShadow: “var(–shadow-sm)”, border: s.highlight ? “none” : “1px solid var(–gray-100)”, textAlign: “center” }}>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 30, fontWeight: 700, color: s.highlight ? “var(–gold)” : “var(–maroon)” }}>{s.value}</div>
<div style={{ fontSize: 11, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.5px”, color: s.highlight ? “rgba(255,255,255,0.7)” : “var(–gray-500)”, marginTop: 2 }}>{s.label}</div>
</div>
))}
</div>
<div style={{ display: “flex”, gap: “1rem”, flexWrap: “wrap” }}>
<button onClick={() => setPage(“admin-opportunities”)} style={{ flex: 1, minWidth: 200, background: “white”, border: “1px solid var(–gray-100)”, borderRadius: “var(–radius)”, padding: “1.5rem”, textAlign: “left”, cursor: “pointer”, boxShadow: “var(–shadow-sm)” }}>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 18, fontWeight: 700, color: “var(–maroon)”, marginBottom: 4 }}>Manage Opportunities</div>
<div style={{ fontSize: 13, color: “var(–gray-500)” }}>View and manage service events</div>
</button>
<button onClick={() => setPage(“admin-post”)} style={{ flex: 1, minWidth: 200, background: “var(–maroon)”, border: “none”, borderRadius: “var(–radius)”, padding: “1.5rem”, textAlign: “left”, cursor: “pointer”, boxShadow: “var(–shadow-md)” }}>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 18, fontWeight: 700, color: “var(–gold)”, marginBottom: 4 }}>Post New Opportunity</div>
<div style={{ fontSize: 13, color: “rgba(255,255,255,0.7)” }}>Create a service event for students</div>
</button>
</div>
</div>
);
}

// ============================================================
// ADMIN — MANAGE OPPORTUNITIES
// ============================================================
function AdminOpportunities() {
const { opportunities, setOpportunities, hourLogs, setHourLogs, addNotification, showToast } = useContext(AppContext);
const [tab, setTab] = useState(“upcoming”);
const [expandedId, setExpandedId] = useState(null);
const [editId, setEditId] = useState(null);
const [editForm, setEditForm] = useState({});
const cats = { upcoming: opportunities.filter(o => !o.cancelled && daysUntil(o.date) >= 0), past: opportunities.filter(o => !o.cancelled && daysUntil(o.date) < 0), cancelled: opportunities.filter(o => o.cancelled) };
const approveStudent = (oppId, email) => {
setOpportunities(prev => prev.map(o => o.id === oppId ? { …o, pending: o.pending.filter(e => e !== email), approved: […o.approved, email] } : o));
addNotification(email, `Your signup for this event has been approved!`, “success”); showToast(“Approved.”);
};
const rejectStudent = (oppId, email) => {
setOpportunities(prev => prev.map(o => o.id === oppId ? { …o, pending: o.pending.filter(e => e !== email), signups: o.signups.filter(e => e !== email), spotsLeft: o.spotsLeft + 1 } : o));
addNotification(email, “Your signup was not approved.”, “info”); showToast(“Rejected.”);
};
const cancelOpp = (id) => { setOpportunities(prev => prev.map(o => o.id === id ? { …o, cancelled: true } : o)); showToast(“Opportunity cancelled.”); };
const startEdit = (o) => { setEditId(o.id); setEditForm({ organization: o.organization, date: o.date, time: o.time, location: o.location, description: o.description, spots: o.spots }); };
const saveEdit = () => {
setOpportunities(prev => prev.map(o => o.id === editId ? { …o, …editForm } : o));
setEditId(null); showToast(“Saved.”);
};
const tabStyle = (t) => ({ padding: “8px 18px”, borderRadius: 7, border: “1px solid var(–gray-200)”, background: tab === t ? “var(–maroon)” : “white”, color: tab === t ? “white” : “var(–gray-500)”, fontWeight: 700, fontSize: 13, cursor: “pointer” });
return (
<div className=“fade-in” style={{ maxWidth: 900, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)”, marginBottom: “1.5rem” }}>Manage Opportunities</h1>
<div style={{ display: “flex”, gap: 8, marginBottom: “1.5rem” }}>{Object.keys(cats).map(t => <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)} ({cats[t].length})</button>)}</div>
{cats[tab].length === 0 ? <EmptyState message={`No ${tab} opportunities.`} /> : cats[tab].map(o => (
<div key={o.id} style={{ background: “white”, borderRadius: “var(–radius)”, boxShadow: “var(–shadow-sm)”, border: “1px solid var(–gray-100)”, marginBottom: “0.75rem”, overflow: “hidden” }}>
{editId === o.id ? (
<div style={{ padding: “1.25rem” }}>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 12, marginBottom: 12 }}>
<div className="form-group"><label>Organization</label><input value={editForm.organization} onChange={e => setEditForm(f => ({ …f, organization: e.target.value }))} style={{ padding: “9px 12px”, border: “1.5px solid var(–gray-200)”, borderRadius: 7, width: “100%”, fontSize: 14 }} /></div>
<div className="form-group"><label>Date</label><input type=“date” value={editForm.date} onChange={e => setEditForm(f => ({ …f, date: e.target.value }))} style={{ padding: “9px 12px”, border: “1.5px solid var(–gray-200)”, borderRadius: 7, width: “100%”, fontSize: 14 }} /></div>
<div className="form-group"><label>Time</label><input value={editForm.time} onChange={e => setEditForm(f => ({ …f, time: e.target.value }))} style={{ padding: “9px 12px”, border: “1.5px solid var(–gray-200)”, borderRadius: 7, width: “100%”, fontSize: 14 }} /></div>
<div className="form-group"><label>Location</label><input value={editForm.location} onChange={e => setEditForm(f => ({ …f, location: e.target.value }))} style={{ padding: “9px 12px”, border: “1.5px solid var(–gray-200)”, borderRadius: 7, width: “100%”, fontSize: 14 }} /></div>
</div>
<div className="form-group"><label>Description</label><textarea value={editForm.description} onChange={e => setEditForm(f => ({ …f, description: e.target.value }))} rows={3} style={{ padding: “9px 12px”, border: “1.5px solid var(–gray-200)”, borderRadius: 7, width: “100%”, fontSize: 14, resize: “vertical”, fontFamily: “‘Source Sans 3’, sans-serif” }} /></div>
<div style={{ display: “flex”, gap: 8 }}>
<button onClick={saveEdit} style={{ background: “var(–maroon)”, color: “white”, border: “none”, padding: “9px 20px”, borderRadius: 7, fontWeight: 700, cursor: “pointer” }}>Save</button>
<button onClick={() => setEditId(null)} style={{ background: “white”, color: “var(–gray-600)”, border: “1px solid var(–gray-200)”, padding: “9px 16px”, borderRadius: 7, cursor: “pointer” }}>Cancel</button>
</div>
</div>
) : (
<>
<div style={{ padding: “1rem 1.25rem”, display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, flexWrap: “wrap”, gap: 8 }}>
<div>
<div style={{ display: “flex”, gap: 8, alignItems: “center”, marginBottom: 4, flexWrap: “wrap” }}>
<span style={typeBadgeStyle(o.type)}>{o.type}</span>
<span style={{ fontWeight: 700 }}>{o.organization}</span>
<span style={{ fontSize: 13, color: “var(–gray-400)” }}>{shortDate(o.date)} · {o.time} · {o.location}</span>
</div>
<div style={{ fontSize: 13, color: “var(–gray-500)” }}>{o.spotsLeft}/{o.spots} spots · {o.signups.length} signed up · {o.pending.length} pending</div>
</div>
<div style={{ display: “flex”, gap: 8 }}>
{tab === “upcoming” && <><button onClick={() => startEdit(o)} style={{ background: “none”, border: “1px solid var(–gray-200)”, padding: “6px 14px”, borderRadius: 7, fontSize: 13, cursor: “pointer” }}>Edit</button>
<button onClick={() => cancelOpp(o.id)} style={{ background: “none”, border: “1px solid var(–error)”, color: “var(–error)”, padding: “6px 14px”, borderRadius: 7, fontSize: 13, cursor: “pointer” }}>Cancel</button></>}
<button onClick={() => setExpandedId(expandedId === o.id ? null : o.id)} style={{ background: “none”, border: “1px solid var(–gray-200)”, padding: “6px 14px”, borderRadius: 7, fontSize: 13, cursor: “pointer” }}>{expandedId === o.id ? “+ Hide” : “- Students”}</button>
</div>
</div>
{expandedId === o.id && (
<div style={{ borderTop: “1px solid var(–gray-100)”, padding: “0.75rem 1.25rem” }}>
{o.pending.length > 0 && <><div style={{ fontSize: 12, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.5px”, color: “var(–warn)”, marginBottom: 6 }}>Pending Approval</div>{o.pending.map(email => <div key={email} style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, padding: “6px 0”, borderBottom: “1px solid var(–gray-100)” }}><span style={{ fontSize: 13 }}>{email}</span><div style={{ display: “flex”, gap: 8 }}><button onClick={() => approveStudent(o.id, email)} style={{ background: “var(–success-bg)”, color: “var(–success)”, border: “1px solid #A8DDB8”, padding: “4px 12px”, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: “pointer” }}>Approve</button><button onClick={() => rejectStudent(o.id, email)} style={{ background: “var(–error-bg)”, color: “var(–error)”, border: “1px solid #F5AEAE”, padding: “4px 12px”, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: “pointer” }}>Reject</button></div></div>)}</>}
{o.approved.length > 0 && <><div style={{ fontSize: 12, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.5px”, color: “var(–success)”, marginBottom: 6, marginTop: o.pending.length > 0 ? 12 : 0 }}>Approved Students</div>{o.approved.map(email => <div key={email} style={{ fontSize: 13, padding: “4px 0”, color: “var(–gray-600)” }}>{email}</div>)}</>}
{o.signups.length === 0 && <div style={{ color: “var(–gray-400)”, fontSize: 14 }}>No signups yet.</div>}
</div>
)}
</>
)}
</div>
))}
</div>
);
}

// ============================================================
// ADMIN — POST NEW OPPORTUNITY
// ============================================================
function AdminPostOpportunity() {
const { setOpportunities, setPage, showToast, currentUser } = useContext(AppContext);
const [form, setForm] = useState({ organization: “”, type: “ISL”, category: “Hunger & Homelessness”, date: “”, time: “”, location: “”, spots: “”, description: “” });
const [done, setDone] = useState(false);
const set = (k, v) => setForm(f => ({ …f, [k]: v }));
const valid = form.organization && form.date && form.time && form.location && form.spots && form.description;
const submit = () => {
if (!valid) return;
const newOpp = { id: Date.now(), …form, spots: parseInt(form.spots), spotsLeft: parseInt(form.spots), signups: [], approved: [], pending: [], cancelled: false };
setOpportunities(prev => […prev, newOpp]);
showToast(“Opportunity posted.”); setDone(true);
};
if (done) return (
<div className=“fade-in” style={{ maxWidth: 600, margin: “4rem auto”, padding: “2rem 1.5rem”, textAlign: “center” }}>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, padding: “3rem”, boxShadow: “var(–shadow-md)” }}>
<div style={{ width: 60, height: 60, borderRadius: “50%”, background: “var(–success-bg)”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 1.5rem”, fontSize: 26 }}>OK</div>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 26, color: “var(–maroon)”, marginBottom: “0.75rem” }}>Opportunity Posted</h2>
<p style={{ color: “var(–gray-500)”, marginBottom: “2rem” }}>Students can now browse and sign up for this event.</p>
<div style={{ display: “flex”, gap: 12, justifyContent: “center” }}>
<button onClick={() => { setDone(false); setForm({ organization: “”, type: “ISL”, category: “Hunger & Homelessness”, date: “”, time: “”, location: “”, spots: “”, description: “” }); }} style={{ background: “var(–maroon)”, color: “white”, border: “none”, padding: “11px 24px”, borderRadius: 8, fontWeight: 700, cursor: “pointer” }}>Post Another</button>
<button onClick={() => setPage(“admin-opportunities”)} style={{ background: “white”, color: “var(–maroon)”, border: “1px solid var(–gray-200)”, padding: “11px 24px”, borderRadius: 8, fontWeight: 600, cursor: “pointer” }}>Manage Opportunities</button>
</div>
</div>
</div>
);
return (
<div className=“fade-in” style={{ maxWidth: 680, margin: “0 auto”, padding: “2rem 1.5rem” }}>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 32, color: “var(–maroon)”, marginBottom: “2rem” }}>Post New Opportunity</h1>
<div style={{ background: “white”, borderRadius: “var(–radius-lg)”, padding: “2rem”, boxShadow: “var(–shadow-md)” }}>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: “1rem” }}>
<div className=“form-group” style={{ gridColumn: “1 / -1” }}><label>Organization Name</label><input value={form.organization} onChange={e => set(“organization”, e.target.value)} placeholder=“e.g. Connections for the Homeless” /></div>
<div className="form-group"><label>Type</label><select value={form.type} onChange={e => set(“type”, e.target.value)}><option>ISL</option><option>Arrupe</option></select></div>
<div className="form-group"><label>Category</label><select value={form.category} onChange={e => set(“category”, e.target.value)}>{[“Hunger & Homelessness”,“Education”,“Environment”,“Disability Services”,“Family Services”,“Children & Youth”,“Other”].map(c => <option key={c}>{c}</option>)}</select></div>
<div className="form-group"><label>Date</label><input type=“date” value={form.date} onChange={e => set(“date”, e.target.value)} /></div>
<div className="form-group"><label>Time</label><input value={form.time} onChange={e => set(“time”, e.target.value)} placeholder=“9:00 AM – 12:00 PM” /></div>
<div className="form-group"><label>Location</label><input value={form.location} onChange={e => set(“location”, e.target.value)} placeholder=“City, IL” /></div>
<div className="form-group"><label>Available Spots</label><input type=“number” min=“1” value={form.spots} onChange={e => set(“spots”, e.target.value)} /></div>
<div className=“form-group” style={{ gridColumn: “1 / -1” }}><label>Description</label><textarea value={form.description} onChange={e => set(“description”, e.target.value)} rows={4} placeholder=“Describe the service opportunity…” style={{ resize: “vertical” }} /></div>
</div>
<button onClick={submit} style={{ background: valid ? “var(–maroon)” : “var(–gray-200)”, color: valid ? “var(–gold)” : “var(–gray-400)”, border: “none”, padding: “13px 32px”, borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: valid ? “pointer” : “not-allowed”, width: “100%”, marginTop: 8 }}>Post Opportunity</button>
</div>
</div>
);
}

// ============================================================
// SHARED UTILITY COMPONENTS
// ============================================================
function SectionHeader({ title, action }) {
return (
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: “0.75rem”, marginTop: “1.5rem” }}>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 18, color: “var(–maroon)” }}>{title}</h2>
{action && <button onClick={action.onClick} style={{ background: “none”, border: “none”, color: “var(–maroon)”, fontWeight: 700, fontSize: 13, cursor: “pointer” }}>{action.label}</button>}
</div>
);
}

function EmptyState({ message }) {
return (
<div style={{ textAlign: “center”, padding: “3rem 1.5rem”, color: “var(–gray-400)”, background: “white”, borderRadius: “var(–radius)”, border: “1px dashed var(–gray-200)” }}>
<div style={{ fontSize: 13 }}>{message}</div>
</div>
);
}

function Toast({ msg, type }) {
const colors = { success: { bg: “var(–success)”, text: “white” }, error: { bg: “var(–error)”, text: “white” }, info: { bg: “var(–maroon-dark)”, text: “white” } };
const c = colors[type] || colors.info;
return (
<div style={{ position: “fixed”, bottom: “2rem”, right: “2rem”, background: c.bg, color: c.text, padding: “12px 20px”, borderRadius: 10, boxShadow: “var(–shadow-lg)”, zIndex: 9999, maxWidth: 340, fontSize: 14, fontWeight: 600, animation: “fadeIn 0.3s ease” }}>
{msg}
</div>
);
}
