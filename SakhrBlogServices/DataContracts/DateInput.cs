using System.Runtime.Serialization;

namespace SakhrBlogServices.DataContracts
{
    [DataContract]
    public class DateInput
    {
        [DataMember]
        public int Day { set; get; }

        [DataMember]
        public int Month { set; get; }

        [DataMember]
        public int Year { set; get; }
    }
}