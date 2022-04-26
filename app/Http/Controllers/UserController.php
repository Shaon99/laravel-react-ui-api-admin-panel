<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users=User::where('id','!=',auth()->id())->get();
        return response()->json(['status'=>200,'users'=>$users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {     $request->validate([
         'fname' => 'required',
         'lname' => 'required',
         'email' => 'required|email',
         'phone' => 'required',
         'password' => 'required|min:6'
        ]);


            $user=new User();
            $user->fname=$request->fname;
            $user->lname=$request->lname;
            $user->email=$request->email;
            $user->phone=$request->phone;
            $user->password=Hash::make($request->password);

            if ($request->hasFile('image')) {
                $extension = $request->image->getClientOriginalExtension();
                $filename = rand(10000, 99999) . time() . '.' . $extension;
                $request->image->move('uploads/user/', $filename);
                $user->image = $filename;
            };

            $user->save();    
    

        return response()->json('successfully added',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $users=User::find($id);
        return response()->json(['status'=>200,'users'=>$users]);        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'fname' => 'required',
            'lname' => 'required',
            'email' => 'required|email',
            'phone' => 'required',           
           ]);
       
        $user=User::find($id);
        $user->fname=$request->fname;
        $user->lname=$request->lname;
        $user->email=$request->email;
        $user->phone=$request->phone;
        if ($request->hasFile('image')) {
            $extension = $request->image->getClientOriginalExtension();
            $filename = rand(10000, 99999) . time() . '.' . $extension;
            $request->image->move('uploads/user/', $filename);
            $user->image = $filename;
        };

        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user=User::find($id);
        @unlink('uploads/user/' . $user->image);
        $user->delete();
        return response()->json(['status'=>200]);
        
    }

   
}
