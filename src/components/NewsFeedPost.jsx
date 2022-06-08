import styled from "styled-components";
import { FcStackOfPhotos, FcVideoCall } from "react-icons/fc";
import PostSection from "./PostSection";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "./Loading";

//this is the component that displays news feed posts, it allows the user to add new post,edit and delete the post
const NewsFeedPost = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sendPost, setSendPost] = useState({
    text: ""
  });

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/posts/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4"
        }
      }
    );
    let postData = await response.json();
    // console.log(postData)
    setPosts(postData);
    setIsLoading(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          method: "POST",
          body: JSON.stringify(sendPost),
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4",
            "Content-Type": "application/json"
          }
        }
      );
      if (response.ok) {
        let postData = await response.json();
        console.log(postData);
        alert("success");
        setShow(false);
        setSendPost({
          text: ""
        });
      } else {
        alert("error else");
      }
    } catch (error) {
      alert("error");
    }
  };

  const filterOutPost = posts.filter((post) => post.user !== null);

  return (
    <>
      <Wrapper>
        <Header>
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRYYGRgaHBocGhwcGhwaHBocHBoaGhoYGhocIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJSU0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYBBwj/xAA+EAABAwIEAwYEBAUCBgMAAAABAAIRAyEEBRIxQVFhBiJxgZGhEzKxwULR4fAUM1JiciM0ByRzgrLxFZLC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAJhEAAgICAgEEAwEBAQAAAAAAAAECEQMhEjFBBBMiURQyYXGRQv/aAAwDAQACEQMRAD8A0ulLSi6UtK9rkeGBhKEXSlpRyAHpS0IulIMT5CoHpS0o2hdDEcgoCGLuhG0LulHIKABq7pT3DrZQ8Tjms/E2eXFFhRKhNcQqOtnpBhrC4+YVfjM603qsc0ddik5JdmljkzR1MbTbu9s8kE5i0nu36rG4ztQxlqbAZ4gXnzCpq+fPeSXAGRa0Ef8AdupyzwXktH0kn4PQH54wO0gkniJAAPipNHGNfs7SeRIIPUFeOvxZcQSSB43/AFR6GKqCC1zi28X25qX5sb2iz9C2tM9jFYj5vVFa6dr/AGXmeA7UVmO0mHADbmPotdl+cNqQWOGqPlmNtxdXhmhLpnPk9POHaNDpTdCHhsSHcIPLkpRaqWQoAWJpapBYmlqLCgGlcLUfSlpRYUA0paUbSu6UuQ6AaF1G0riOQEvSuaVI0rmhR5G6AaV3Sj/DS0o5CoAGLoYj6F3QjkFAdKWlH0rhiUcgoFpQcRVDbbuOzRv49B1KNUeSO7Yc/wAgodZ7WMOogc+ZPXmUJj4kV7HuHecGA8G/dx+ygYx9GmAXw0RaTLnfkFFzztAygIdd34Wj2JXn2Pzh1R7i43dz2AjZYyZ1Hrs6cOBy29I12YdqqbGkMAcBw2H5lYzNM5fVNzsLDkq7EVyT4W8Y5JlJgfyDo6iVzyzylGmdkMEYu0SaL9R0wf3y6qQ3DOHUbgj7qPSonUNQdA30xO3pM/sLTYR4qNAkAxZxGk9Y5z1XFOVHXFGcq4QgGR3Z3HCOav8AJcrDWFzzZwMTv0IV1luGZpd3RqEy07HwMwQf31k4DCgMcAe6Lhpvp5gepWHOx8aM5VyM2ezgZ8uIPI/oVMzLL9IFRvdcRqaRaHAS4W5i/qrjCVJpwZ1C0iILdwfEfZVWIxTnVNAaYc4AT+GCfYiy1GbszKJLyvOXEMDyNZALTtqHLxWuwGL1gSItdef4mkWUmSPlkNPGC4mPX6q9yLNtIDX7juzxIB3Xfh9S+pHBn9MqtG0bdcLEPAVA6fAHxClli6+R5zjRG0rmlSCxc0J8goBoS0o2hLQlyCgEJI+hJFjonfDS+Gj6UtK5+RSgHw10MRoS0o5BxAFqQapEJQjkFEYqpxeYsaZcTGwAab+fFXbxZVowoF41wbTw8tlrkNRKKrmxfYOawf3nSfID9EDEvptBL3jbfUPsVosTB+YtAHDeywna2rh2MMMb8R/y7WHOyTlSspCNujIdpXsdWcab5bY8bW26qle6U/FCTYIQp2hcM522z14Y6ikEZQJvPqp+FwnGR++ij4djog7KxwzSdxyvx8lKUyscbbJhayNIgbSW8+eym4fDjTBeTJMAAHykcLoFHLpVvg8vcOQnid/Jc88qLxwMHh8KQ114jh4beCl5Zq0km7jt+ZU5mABbABHMzup2DwEGBbp+fRSU3ZSWNUQ8Jl7onSSbgwLHwUo9nNQa9oOodOMe5lanLsJ4kxyVpTwU/htM+CrFtnPLjHs8tzjJXN0l3Pz/AEVa3DRLhOrcX+gK9Xx2Wi4hpB5tWWx+SXkQByhajNxezEsakrRD7O5iC5jTZwlpHDvCR7grZ6V5rj8OaL2v27wk9AZ2XouAxIe0HpPiOYXq4cvOJ4vqcLhIeWJuhSS1c0q3I56I+hLQjlq5pRyCgMJI2lJHIKJDnAbkLshebY/MMW8juuABmAIuOqLhMwxLH64ebCWkGI/NcP5EbOv2JfR6HqC7IWDbmNZz3OLHwRaJEKOzHYkGxfANhEofqYoFgl9HospArA4nO8SdMMcCJkgG/KyNhc4xMEOB4wSE/wAiH2P2Z/Rt3NHJBcGjeyy2Ez+vMOaI5kbeK7ic5xDiAGxHEDdP34V2Hsz+iR2jqBlJ7zJDWk8oHNeQZ1jS93xDYOmOJtbyXoXaTH1n0XM0/wAxpHXr9F5ViKh16d4EHp08UPIpLRfDjcXsC0lzob6q6wWXS2+6FleFGoELU08LA2XNLs9KHRUswgAUnDUIPDxU11ILlNkFTktHTEtcHhgOO6taWFPBvmVHy1zYtvx5q4prjktlr0KjheZ9FPoUwIgIbXIrHooy9lvgXKyplUmGqK1w7pK6IM4c0d2FqMEQBt7KpxNO6u3MG481VYvdPIjGCWzO51k7KjDz9v0Vb2aruYTQeb04089JWtc2QsD2oY5ldr28e6YtMKnp8nCX8Zn1eJTj/hv6VQEbj1SLhzHqvM24moOL/dCfjX/3+67vfieX+PI9QL2/1D1TTUb/AFD1XlrsW/k/3TTi3f0v90e/EPx5HqfxWf1D1SXlv8U7+l/ukj34B+NI9C1roeP2FE/iE7446LyT2OJJDx+wlqHRRvipakC4hzU8PRNfVtwQweiEXiLynY6OVK4jZsoLcU6flI8beykOZaAhOpnoOpTTE0UWeZsWAyDZroI3kiy8rr1JOkASbzxvzK9F7S4thlluU7Lz6qwNcR1XTjdRJ1stMkbceK2bWWWN7PMl8Dmty5lkm9nTBaK+q1A4qTUCGymSYU5HREmYCpEjmr/C1FV4DAk3KtqOHIXPLsoTybSk2outZbZMLOiyIk4epdWmHrRCqWUeUgyP1U+k0rUXRKcU0W78VZQXuBQXWXNRRKTZKONR6COWN7UR8amLHvT7bLWvdxWAz+oXYljRNu8fVag9hOPxLqk9oF2pxe3kgsMgfRIgBbsiohS5v7CaXN6eiC48kMnqiw4knU3p6LqiSEkWHEsdQ5LmvouAJFl+akVoMHjknNeN4UfR6J2kpiok+aC+laxTNJ5Lmk+/igVBGt6qk7T5k5jGsZcuMT7CVa1DG5t4rPZ/iqbWObqBd+FoMu6GPFNdjaMXjsS0iXxLriTJmYIJ5qjdVgcFJzVji4u0921vafFV9BmpwaOJC649EfJveyGAhmtwubhaGs6yiNeKNEGCYAsOKyuP7TVCTDCBwk387LKRVyro1DnjmEWg5vO683OavnVJn2UzC5u+Z1CecwnKIe6z2DAvGlXOGaHNXm2S9pTLWP3kCZBBnj1Gy0+H7S050gif3P0XNODjsrHLy0aRzIUd7bodPNmObv6/XwQauPYDEqRZWWdCmrTCMB3WYZmzRx/VWWDzFpHzAbcQtx0Qyb1ZcYigFCfTXW41m2oJ+ppMAieUolGycW49sjvFl5tUrB+MqgEaWgA+/wB16bUbAMrxbLcQ44itUbcaz1/EU8a2bm7ibJrvRO1dUsM8OYHAb80YME7BDZlIjudyKY53VS3UhwQnURzQBF1DmkjfDbz9kkDLA35rsIhASkC481kYzX4yuueBxTjG64WBAURquNg2MnkFHdUquPd7n1UoYQXiPAofw3DbnwugKIlbLy89973WveJ/+qiPy9jRpYxokyTE7bX3VrUovd4eQQW4NwILjMzAHDh9E0wMJmdEGuGjYXcdpgX8tlS4CiHYkAC2omFrsZS11K7gLCGN8dz9lnuy9AnEmRcT9V0QejMo6X+m4xMBu3RU2IYziAPqrPMKloVFXaXfi0zaRuOqxJNs6cVKJHq4Wg25YPF0fcqBVp0HbNb/ANpAPsVJrZKSDLi+RYumx5gSqv8A+DfN9IHGJn6JpL7FJyX/AJQangaZPdc5p4X91OoYcgyHTz5qLWwBa6WEDk0kn3KsMM7nyv4rE+XhlIKDW1TLnC4pwG6c7EuuZQ8NTLhIBgbpuJbpU+L7N8o3Rm8zxtUvIbqPhKijG4kRd8jbeytcXmDWePJVTs2dNxA8FaDf0c+SEFtsucszzEC1RzgLXLdVuO1/RaOnm7n96m50g/iE7RcbFu8rK5XWNRwEsjrt9V6HkLGQKb9MOnTpu09DaWu6FEpNdoh7UX0ybk+eVa3xGvbIax3eAjYG5H5LF9nMM0NcSCS95J8OEdV6bUotp0KkAABjv/EwsT2eY1jRAjVcrF6bHW0iyphoGkSAOCcfFFe8HhKA+pH4SsGqoTnwN0J70V5am6BzQFAfitSRPhpIGTHPsCCD53TS88E0URMwuml1ISsOIVj7H6JNd0twQPhCbuKLTbHFO0KmEcDBghMaCCBvxK46neQd1xzHg2v5pIGqJLHSJPso9ao3XJBAaDPjuh/xJBgMM/dRczc5lF73AmGu9SDf1hMKM/gampr3nZz3vgce/AJ8ghZNRaMTUI4ifC912tXGHpjWIAc1jhxjn5TKBltRoxJ0mQW2PMGCFeL+ImXGLpyVX/AvsrSqEM01rTKxbWiCaPkmOodVNcxCc1ZcUU5SKt+Ek3XW0QLKVUlA1IoVnqHZXCt+E2Gi4vYX8V3tb2VZUpl1FobUAJgWDuYjml2NfNNg8PrK1lcrKXxZyZpyjkVHzjjstcxxD2Qeov7ruBy+iXf6jA4Ebai3zkL3TMsqZWaWVG6gePEcoPNZ2l/w+pB0ue+OVgfMpW+0Xjlg18jP5Fg8G1ppsw7CXES4l1R1uUraZZk1Jh1sZpPp7Kyyzs7Qo/y2x43PqrT4IARxk/2ISzQWoozPad+jDVSN9EesBZrKaB+GLXA9lou1zNdFzJjU5oPhMn6Kpa3SBodsI8llvVD3oE8CJJXGxG4Q3OdJtA58EPVebFKh2Ec0crptRvIJNq3giT7Ljxf7JUNOxs9CklbkUkGqJwcntIF5HgoxpkCxQmtdMSPEhKgbJxaNyQuMY3hKis1Cxg/vZOc0Hj6FIZNFNvFNewAzKa18gAwuaBxKAO/w4nVefHZQs/p/8s+Cfw+moSrFjo4+CFmdIvpPaDctMeMW94RYuzAf8RH6QGR8xD/KCFWYIuZUY6I7rPQgKf21msWOGzaOrwuJ+sKnwFRxudyGkeAXVj/UlJVJG5D5vzTpUDAV9TQDupgcp8mtHbCKeycwM0EndU2JqSeQRqz4CqsRXEwhSbG0kCxFQmzfMpmGdeCh/wAWGOJiQd1JY5j+81b5V2Trk9HpvYk9xvitnVXnXZjMA1gBMFbMZqwAEuG3EqamqaOf1GKTkpJD8biCxpdwF/JQsHnTKmxH3T8a81Wubt3THovIsJmT6b940ug+RhK3ejWLFGUal2e60arYEFcrVLLI9ns5+I0yCCPcc1efGtutvJqiMvT8ZFVnpkNHN30H6qgcS0xBIHFWedVP9Rov3WEmP7j+iiNDXbKLLJAHlv6Ib2NtAhPcwA7ldLxG4KWzevJxwEAgXQ2tBJmQiyY3TWvJOwTtipC+G3mfQpIknouoFohjEOO7T0snvqOAtHgUeji7DUwzz4IFdoLtWoxyQ+hLbFTqEfM0R4pMLZkmPNce68hwM8LJ9IyJ0D2PssWUpEgOi7AHeaaXk7tKa6jcRaU5rHCZuD7IsOP0SH4gQAWgiN05lURI2Q6VMcRdEFFsDh5pXYVRj80wjW4lzD8lWm/SDwJPeaOk39VkcMS1rZ3ALTz7riF6Hn+GBrUCSdPeaed4LYPC7Vhs7wjmYl7CdQGp4IAHzaSZAXRil4Jzjqy0wL9ImLfmrJj5E+yoMLipZE32/VTqNSIkyLJyiWhLRLxZgLLYrEHU6Ff5hXgTEk2CzZwL3OkH2t4LUBZLboj16pjZCo5g9h3tKt/4drhDu4eI4eRXcPk1IuGtztE30xPkttryKOKfcQ+D7R/LDTq8YBPVbLJK/wAZwqVXSWwWtHyMHPSdzbcqtw3ZfA1BNOo9oEWdEg25rU08BRpMYGA2m+oGZ81P4+Amsj/YuXZgGtcZFh68F55neX68Q99OAHQSP7juPqU7tlm7aLNNMPDnf1NIaQeRO6zvZ3M3OcGmd5nqbGUnHVkotpm6yOm+mQHDwI5LZUHd2VU0mDS0m1hfquZhi/8ARgSCTpA4zMfaVKijlaIwrEve8iNTrf4iw+k+aJoIki/FQvhuaA0OdEWBuguLxHeM8iErFRMc8buG/wBUNpHIqK9z5hzgRySbVJHzAHkmIfWqxz/9p7Gm5Bso5e78RanPqOIkEERshA9B4PMJKu/in/0j1XExF61ljHmUqNJtwPVDLjpBmJ3hMDH3LT6p1ZO2gz6DDOoAjgdihuwwIGl0Afu6c67g7ptHFAxBeD3AI5X3WXGikZNj34XXA1X4JNwdSRof5I+HrFze8AHdEqVXSZ6+aEglKhzCZvPI2tKLWERb0Sq4hrdk6jig4weAT4iUytxmHdUD4B1DToPJze8PdZTNqYfiRViA+ncHnsfSIW9w7hqeJ4g+o/RYnOHNNeo5uwOkDhvLiPErWOO7G53oyeIb8N8bAzCkUMSSf7Rf9Aj5jS1jwVNSrw7S7guhq0JfFlu/HAmOvsrSkARa6zj2AkOmP3t4q3wOIAGkGVlx1orGW9hcQxpsVIyzB4aYrMcRza9w9QECuJbdUGNxLmmASspMr7kY9nqeDweWN0wwHnqe8+xctRgjhw0CixgG8iCfXdeF5Lg69V1g/TIFydzMW8l65kOUmmwEyTHFKTcSEpRn9/8ASP24yX+Jpt07sM+UGfsvO8BlDqT99jttxsYXruYHSyT5jfzCxT2Al5kar24kC8368FlNtUTbpk2pjpAY4wABPLr6KTgH/Eh5IDRIaOM7F1+dlQ4HAurPl2r4bT0GqDdp4wtC9rLBrNICxLSpGorew1QODgREcbplSm4k7DiOaa+Q06QOaDWzBmgahc8BKwkzblFDqj53bJPuooF4DYPqpeHxVAgAkgjnwlHcO73CI4HituNE1K/JWvrukhzDbeyTAw7CCd1IOu+s+YQWOgAETe9tghtDUX9jIYkpMN5D0SSsdMYASHAEmBI/JRcHintk6pB3CmNwRDiQTbqiHCWlN6MrZFq4ktdIIhwBEojnlzbm5PNHGABEc9iQmswGk3In0Wds1pESlTg91zpF4mVMbjXECw39kdlAMdMA35oNTChoPBskyTsPFFS8DXF9ocHtJLiL81X5vnNPDFrquqDsGiTZZHP+0jviFlF8MaIkH5zxM8llszzCpUI1uLo2kzHguzH6aTScmSm4ro9GzDtbTLA6iHBx21CLHmFnsPiC6S4yTv4rK4bEnYnwVtgsVwKq4RiqRKLdpstX3VHmeGtIG11dsfIQ6jJUro6ePJGfw+L2BNxzU+hiwDuL8lFx+AvqaPEKC2oR0P7lPTMNNGrwbzUIBcYMT4kwB9Vosty6iAZZqIFj1j2O6wuAzBrZDhIOmP7YIJ8JjdarAZ01rAXOFrkGduLfrdKRjZqMvxrGPDAwcyBAMcyQtJgsxb8p5nivJmZyzXMQC4meOkkQB5BXFDPxpOxJk/4lsWv+7qbiFm0zzN2BtoJmPJZnBZXVxbHuplrB3tJcCQ9w4W/D1CHleXPxjg54ilYkEnvEcuhXoVGk1jWtY0Na2wAsAFl/Ho0lZ572ezV2h9Kq3RVokhwHEA7x058loaNOe/qBaRtCoe0lAUszpvHy12Q4cyBpPtCNkWKjXSdc03ECeIH6QtKCkr8nXwUoposKr2tPdE8Dz8FDqNBIOi/RXLGsPfYYJ57INRrwZDARxgqbhKPgk4PplU94nQ5pAjiPunNe2Q2wHAqY/GQYew3/AHxTG1mbhhHkscvsTx/REqVwHWftw2lHbUkEAieCFVeyYIjqVHxFGkXCH35XCOSDi+ywl3IeqSgahz9yklaHsu6QeJjj1XKb3k3mOVlBbingdRKazE6mamGDuRNxzTTTMuLRO+MZd3iI4EbIlbFaRrc4AASSfqqTNM1ZQAe83jgRPosT2i7TPxLdDQWs4zu6PDgr4vTyn10YlPiT+0XbF7zow7i1gN3izn+HILN5lneIqNDX1XuaOEwD4xuq3VwK664XpRxQiqSJNuRxtSXSu1DKjMN0You0Yi7Qza6kNr8UIhMcIU5IdUabL8VqHVWESsngMQWuWkoVpC55xo6MU/AWpTUCvgQ7cBWBdKYVFto6eKZQvy1wXBQfxJV6Wp1LDF3C3OEub8ieFFTluT1a7wxgMzvwb1JXpmS9jKTA34jjUIuQbNnwQ+zuHaxoDW+PCepWroHgVlzbIygrJVBgAAAgDhspMINNFZdYBmE7eH/m8Hz7/wBQqrB19OPqNBs7ST5tAU7tJVFXMmtFxRYAf8nXI9IWexNQtxvxB8pcGHxDRZdOJUjrx/qjb0H6HFh2RPiG44j3UTMBBDvBPe+Q1yqbaHVMXaHDU3r9CgfDY6dDyw8jceS5VGoGP31VXVeWmFmUIy7JuCZZPwdXTYMeRyN/QoAoPjv0yPsm4fE6vlMEcFOpY53G6k8MfBiWOXggaD/SElbfxbP6fYLiz7P9McJkbOcU2iynUeYDXRpG7yRsOqpHYetXeXGoyi1xkMYbj/IjcqjoZ1TxL2DFAy091zXEDwcFq34ZhADWgCO6Rx8+KvjxLGv6KuZku0+QVGD4hcXtG5vbkSPus3rK9WwVQ3pPAcCDE7Ef0mVSYrsfQc4lj3tBPy2MdBImF1wypaZmXp3dxPPqoBQmFbw9hmuNqxjqwbeRVd2k7IGhD6RL2R3piWnn1CHli3onLBNboyNVsGURi1OVdmW12GXEPI7sRAPCRy2WY+GWktcIIJB6EGCPZJSTZN4pQlvyKFwiU4ribHQJpv1Vzgq+yqKjeKfha8GDspSiYVxdGmp1UdlzA3PJByTLamIcBSbI4ngPEr0jI+zTKEOd338SRYH+0LiyNJ0dsZUtlXk/ZcwH1QOjfzUrG0GtsBC14oSFWY/L5lSDnb2UuW1IMK+wxm6zvwHMdCv8rGyTG15LNoQM2zFuHoPqv2aLDm7gB5qwY1ec9s8f/EYhuHYe5TPfjYu/RairdGIrlKivyQODKmIqfPUJefDeFAyiatCo87irqHsfoVc19J0UB+MQRybx/JQuzdDRSxDeDajgPBtvsuxKlR1Ls0lYzTYeYhCp/KWp9G9BhTKaZoaXFBrsDkZOifNAFNXmm9r27bOCuhEBw+VwkfkmPw4cC07EQhZVIDqLtxdqGBKkJIfwz1XFkKPOu1X+7f4BbfLf5NPw/wDyupKsujnx9skfjb/kPspD9z4ldSWGdCCYdRe038h3h90kkkN9FN2Y4+Kymb/zcV/1H/8AmupKi7OfL0ijXAkkqs4xIA3SSWZdGJdo9h/4U/yneK3wSSXn5f2OphKXFDr7JJKZldmex3zBWGXbBJJJlfBa1PlPgfovJMp/mVP83/VdSVcf7Bi8hsH/AL8/4D6lPyP+RW/6lT6lJJdTLovMP/t2eK5T4JJJGl0MO5TW7eaSSYBW/dRqf+5b4rqSbAu0kkkgP//Z"
            alt="profile-avatar"
          />
          <Input type="text" placeholder="Start a post" onClick={handleShow} />
        </Header>
        <Footer>
          <Section>
            {/* Onclick to upload image */}
            <FcStackOfPhotos size="1.5rem" />
            <span className="ml-2">Photo</span>
          </Section>
          <Section>
            <FcVideoCall size="1.5rem" />
            <span className="ml-2">Video</span>
          </Section>
          <Section>
            <img
              src="https://img.icons8.com/color/48/000000/clock--v4.png"
              alt="event"
            />
            Event
          </Section>
          <Section>
            <img
              src="https://img.icons8.com/color/48/000000/scroll.png"
              alt="article"
            />
            Write article
          </Section>
        </Footer>
      </Wrapper>

      <hr />
      {isLoading && <Loading />}
      {filterOutPost
        .splice(-12)
        .reverse()

        .map((post) => (
          <div key={post._id}>
            <PostSection post={post} />
          </div>
        ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            className="font-weight-normal"
            style={{ fontSize: "20px" }}
          >
            Create a post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePost}>
            <textarea
              rows={4}
              className="w-100"
              placeholder="What do you want to talk about?"
              style={{ border: "none", borderRadius: "10px" }}
              value={sendPost.text}
              onChange={(e) => setSendPost({ sendPost, text: e.target.value })}
            />
            <Button variant="primary" onClick={handleClose} type="submit">
              POST
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsFeedPost;

const Wrapper = styled.div`
  padding: 1rem 1rem;
  min-height: 5rem;
  border-radius: 6px;
  border: 1px solid #e6e6e6;
  background-color: white;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  border-radius: 25px;
  border: 1px solid #adadad;
  padding: 0 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 100%;
  margin-top: 1rem;
`;

const Section = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
  padding: 0.7rem 0.5rem;
  border-radius: 4px;

  img {
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #dddddd;
  }
`;
